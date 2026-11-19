import type {
  CoraEntry,
  Language,
  LeaveCreditEntry,
  NcmPayEntry,
  NonOccIncentiveEntry,
  OccupationMaster,
  OfficerAllowanceEntry,
  OfficerPayEntry,
} from '../types/mol';

export type YouthProgramChoice =
  | 'none'
  | 'cadets3'
  | 'cadets4'
  | 'cadets5'
  | 'jcr3'
  | 'jcr4'
  | 'jcr5'
  | 'cafiep';

export type PriorCafChoice = 'none' | 'less5' | 'more5';

export interface SimulatorInput {
  force: 'reg' | 'res';
  occupation: OccupationMaster;
  selectedPayRowId: string;
  experienceYears: number;
  diplomaOverFiveYears: boolean;
  youthProgram: YouthProgramChoice;
  priorCafService: PriorCafChoice;
}

export interface SimulatorOutcome {
  entryRank: string;
  startingPi: string;
  tcpSummary: string;
  leaveCreditSummary: string;
  allowanceSummary: string;
  bypassedSummary: string;
  warnings: string[];
  governingNoteKeys: string[];
}

export function evaluateEligibility(
  input: SimulatorInput,
  datasets: {
    regPayRows: NcmPayEntry[];
    resPayRows: NcmPayEntry[];
    officerRegRows: OfficerPayEntry[];
    officerAllowanceRows: OfficerAllowanceEntry[];
    officerResRows: OfficerPayEntry[];
    coraEntry?: CoraEntry;
    nonOccEntries: NonOccIncentiveEntry[];
    leaveEntries: LeaveCreditEntry[];
  },
  lang: Language
): SimulatorOutcome {
  const warnings: string[] = [];
  const noteKeys = new Set<string>();
  const isFr = lang === 'fr';
  const isOfficer = input.occupation.personnelType === 'officer';

  if (isOfficer) {
    const rows = input.force === 'reg' ? datasets.officerRegRows : datasets.officerResRows;
    const chosen = rows.find((r) => r.id === input.selectedPayRowId) ?? rows[0];
    if (chosen) {
      chosen.resolvedNoteKeys.forEach((k) => noteKeys.add(k));
    }

    const allowanceMatches = input.force === 'reg' ? datasets.officerAllowanceRows : [];
    const allowanceText =
      allowanceMatches.length > 0
        ? allowanceMatches.map((a) => `${a.allowanceAmount} (${a.paymentMethod})`).join(' · ')
        : isFr
        ? 'Aucune indemnité directe répertoriée à la Liste D pour ce plan/élément'
        : 'No direct List D recruitment allowance for this plan/component';

    allowanceMatches.forEach((a) => a.resolvedNoteKeys.forEach((k) => noteKeys.add(k)));

    // List L Officer Leave Credit
    const officerLeave = datasets.leaveEntries.find(
      (l) => l.personnelGroup === 'officer' && chosen?.productionPlan.toUpperCase().includes('MED')
    );
    const leaveYears =
      officerLeave && input.experienceYears > 0
        ? officerLeave.leaveCredit
        : isFr
        ? 'Selon le service antérieur admissible (Liste L, max 5 ans expérience civile)'
        : 'Subject to qualifying prior service (List L, max 5 yrs civilian experience)';

    if (input.diplomaOverFiveYears) {
      warnings.push(
        isFr
          ? 'Vérification requise : assurez-vous que le permis d’exercice ou le titre professionnel demeure actif et valide au Canada.'
          : 'Verification required: confirm civilian professional license/credential remains active and in good standing.'
      );
    }

    return {
      entryRank: chosen ? chosen.applicableTo : isFr ? 'Selon le plan de production' : 'Per Production Plan',
      startingPi: chosen ? chosen.payIncrement : 'Basic / Base',
      tcpSummary: isFr ? 'Selon les conditions de la Liste C / E' : 'Per List C / E plan conditions',
      leaveCreditSummary: leaveYears,
      allowanceSummary: allowanceText,
      bypassedSummary: chosen ? chosen.conditions : '-',
      warnings,
      governingNoteKeys: Array.from(noteKeys),
    };
  }

  // NCM evaluation
  const payRows = input.force === 'reg' ? datasets.regPayRows : datasets.resPayRows;
  const chosenRow = payRows.find((r) => r.id === input.selectedPayRowId) ?? payRows[0];

  if (!chosenRow) {
    return {
      entryRank: 'Pte / S3',
      startingPi: 'PI 1',
      tcpSummary: isFr ? 'Aucune ligne dans cette composante' : 'No table entry in this component',
      leaveCreditSummary: isFr ? '0 an' : '0 years',
      allowanceSummary: isFr ? 'Non applicable' : 'Not applicable',
      bypassedSummary: '-',
      warnings: [
        isFr
          ? 'Ce GPM ne comporte aucune entrée directe pour la composante sélectionnée (vérifiez l’autre élément).'
          : 'No direct pay entry exists for this occupation in the selected component.',
      ],
      governingNoteKeys: [],
    };
  }

  chosenRow.resolvedNoteKeys.forEach((k) => noteKeys.add(k));
  if (input.force === 'reg') {
    noteKeys.add('A:general:1');
    noteKeys.add('A:note:2');
  } else {
    noteKeys.add('F:general:1');
    noteKeys.add('F:note:2');
  }

  const catUpper = chosenRow.category.toUpperCase();
  const isMoq = catUpper.includes('MOQ');
  const isSemiOrSkilled = catUpper.includes('PSD') || catUpper.includes('CTQ');

  // 1. Over-5-year diploma warning
  if (input.diplomaOverFiveYears && isSemiOrSkilled) {
    warnings.push(
      isFr
        ? 'Diplôme obtenu il y a plus de 5 ans : une ERA (PLAR) auprès de l’AGPM est obligatoire sauf emploi continu confirmé dans le métier.'
        : 'Diploma >5 years old: mandatory PLAR submission to the Occupation Authority unless continuous employment in the trade is documented.'
    );
  }

  // 2. Non-occupation specific incentive (List K)
  let youthNote = '';
  let effectivePi = chosenRow.payIncrement;
  let effectiveTcp = chosenRow.tcp;

  if (input.youthProgram !== 'none') {
    noteKeys.add('K:note:1');
    noteKeys.add('K:note:2');
    noteKeys.add('K:note:3');

    if (input.youthProgram === 'cafiep') {
      noteKeys.add('K:note:4');
      if (input.force === 'res') {
        warnings.push(
          isFr
            ? 'Liste K : le PEEFAC (CAFIEP) s’applique uniquement à la Force régulière, pas à la Première réserve.'
            : 'List K: CAFIEP applies to Regular Force NCMs only (not Primary Reserve).'
        );
      } else {
        youthNote = 'CAFIEP (PI 2 after BMQ)';
        if (effectivePi === '1' || effectivePi === 'PI 1') {
          effectivePi = '2 (CAFIEP)';
        }
      }
    } else {
      const daysMap: Record<string, string> = {
        cadets3: '180 days',
        cadets4: '270 days',
        cadets5: '365 days',
        jcr3: '180 days',
        jcr4: '270 days',
        jcr5: '365 days',
      };
      const bonusDays = daysMap[input.youthProgram] || '';
      if (isMoq) {
        warnings.push(
          isFr
            ? 'Liste K, Note 1 : le crédit Cadets/RJC n’est pas accordé lors d’un transfert entre composantes ou réenrôlement GPMQ (ne compte pas pour l’ACA).'
            : 'List K, Note 1: Cadet/JCR credit is a one-time enrolment recognition and cannot be added to MOQ TCP.'
        );
      } else if (chosenRow.payIncrement.includes('2') || effectivePi.includes('2')) {
        warnings.push(
          isFr
            ? 'Liste K, Note 2 : le crédit Cadets/RJC ne peut pas être cumulé avec un ÉS 2. Le mécanisme le plus avantageux pour le candidat s’applique.'
            : 'List K, Note 2: Cadet/JCR credit cannot be compounded with PI 2; whichever incentive is more advantageous applies.'
        );
        youthNote = `+ ${bonusDays} (${isFr ? 'comparer avec ÉS 2' : 'compare vs PI 2'})`;
      } else {
        youthNote = `+ ${bonusDays} IC (List K)`;
      }
    }
  }

  // 3. Allowance & CORA non-combinability (List A vs List J-1)
  let allowanceSummary =
    input.force === 'reg'
      ? chosenRow.recruitmentAllowance || (isFr ? 'Aucune indemnité (Liste A)' : 'None (List A)')
      : isFr
      ? 'Non applicable à la Première réserve (Liste F — ÉS uniquement)'
      : 'Not applicable to Primary Reserve (List F — Pay Increments only)';

  const hasCoraEligibility =
    input.force === 'reg' &&
    Boolean(datasets.coraEntry) &&
    (!isMoq || input.priorCafService === 'more5');

  if (hasCoraEligibility && datasets.coraEntry) {
    noteKeys.add('J-1:ref:A');
    noteKeys.add('J-1:ref:D');
    noteKeys.add('J-1:ref:E');
    noteKeys.add('J-1:ref:F');
    warnings.push(
      isFr
        ? 'Règle de non-cumul (DRAS 205.525(10)) : l’IRGPC (Liste J-1) remplace et annule toute indemnité de recrutement de la Liste A.'
        : 'Non-combinability (CBI 205.525(10)): CORA entitlement (List J-1) supersedes and cancels any List A recruitment allowance.'
    );
    allowanceSummary = isFr
      ? `IRGPC / CORA (Liste J-1, en vigueur ${datasets.coraEntry.effectiveDate}) — remplace Liste A`
      : `CORA (List J-1, eff. ${datasets.coraEntry.effectiveDate}) — supersedes List A`;
  } else if (datasets.coraEntry && input.force === 'reg' && isMoq) {
    noteKeys.add('J-1:ref:D');
    warnings.push(
      isFr
        ? 'Liste J-1 (Réf. D) : en catégorie GPMQ, l’IRGPC est limitée aux membres de la Première réserve transférant à la Force régulière pour la première fois.'
        : 'List J-1 (Ref D): for MOQ applicants, CORA applies only to Primary Reserve members transferring to the Regular Force for the first time.'
    );
  }

  // 4. Leave Credit on Enrolment (List L)
  noteKeys.add('L:note:2');
  noteKeys.add('L:note:4');
  let leaveCreditSummary = isFr ? '0 an (aucune expérience admissible)' : '0 years (no qualifying experience)';

  if (isMoq) {
    leaveCreditSummary = isFr
      ? 'Non applicable (GPMQ — calculé selon l’ORFC 16.14)'
      : 'N/A (MOQ — prior CAF service calculated per QR&O 16.14)';
  } else if (input.experienceYears >= 1) {
    const capped = Math.min(Math.floor(input.experienceYears), 5);
    leaveCreditSummary = isFr
      ? `${capped} ${capped > 1 ? 'ans' : 'an'} (max 5 ans pour expérience civile pertinente, sous réserve d’ÉRA / AGPM)`
      : `${capped} ${capped > 1 ? 'years' : 'year'} (max 5 yrs relevant civilian experience, subject to OA PLAR)`;
    noteKeys.add('L:note:3');
  }

  return {
    entryRank: chosenRow.rank || '-',
    startingPi: youthNote ? `${effectivePi} · ${youthNote}` : effectivePi,
    tcpSummary: effectiveTcp || '0',
    leaveCreditSummary,
    allowanceSummary,
    bypassedSummary: chosenRow.bypassedOrAwarded || '-',
    warnings,
    governingNoteKeys: Array.from(noteKeys),
  };
}
