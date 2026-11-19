import type {
  CareerProfile,
  CoraEntry,
  FootnoteEntry,
  LeaveCreditEntry,
  NcmPayEntry,
  NonOccIncentiveEntry,
  OccupationMaster,
  OfficerAllowanceEntry,
  OfficerPayEntry,
  ProgramEntry,
} from '../types/mol';
import { resolveAndGroupFootnotes, type GroupedFootnotes } from './footnoteResolver';

export interface ActiveDatasets {
  occupations: OccupationMaster[];
  listA: NcmPayEntry[];
  listB: ProgramEntry[];
  listC: OfficerPayEntry[];
  listD: OfficerAllowanceEntry[];
  listE: OfficerPayEntry[];
  listF: NcmPayEntry[];
  listG: ProgramEntry[];
  listH: CareerProfile[];
  listI: ProgramEntry[];
  listJ1: CoraEntry[];
  listK: NonOccIncentiveEntry[];
  listL: LeaveCreditEntry[];
  footnoteMap: Record<string, FootnoteEntry>;
}

export interface OccupationDossierData {
  occupation: OccupationMaster;
  regPayRows: NcmPayEntry[];
  resPayRows: NcmPayEntry[];
  officerRegRows: OfficerPayEntry[];
  officerAllowanceRows: OfficerAllowanceEntry[];
  officerResRows: OfficerPayEntry[];
  careerProfiles: CareerProfile[];
  regPrograms: ProgramEntry[];
  resPrograms: ProgramEntry[];
  ncmstepPrograms: ProgramEntry[];
  coraEntry?: CoraEntry;
  nonOccIncentives: NonOccIncentiveEntry[];
  leaveCredits: LeaveCreditEntry[];
  groupedFootnotes: GroupedFootnotes[];
  totalLinkedNotes: number;
}

function matchesMosidOrAlias(
  occ: OccupationMaster,
  rowMosid: string | undefined,
  rowLabel: string | undefined,
  tableId: string
): boolean {
  const m = (rowMosid ?? '').trim();
  const label = (rowLabel ?? '').toUpperCase();

  // Specific CAF MOL 26/27 cross-reference quirks
  if (occ.mosid === '00388') {
    // List F row 21 prints 00386 LEET while RCAF 00386 is AOS TECH
    if (tableId === 'F' && m === '00386' && label.includes('LEET')) return true;
    return m === '00388';
  }
  if (occ.mosid === '00386') {
    if (tableId === 'F' && label.includes('LEET')) return false;
    return m === '00386';
  }
  if (occ.mosid === '00385') {
    // List I prints 00383 for Sig Tech
    if (tableId === 'I' && m === '00383' && label.includes('SIG TECH')) return true;
    return m === '00385';
  }
  if (occ.mosid === '00383') {
    if (tableId === 'I' && label.includes('SIG TECH')) return false;
    return m === '00383';
  }
  if (occ.mosid === '00305') {
    // List I row 591 prints 00304 for WFE Tech
    if (tableId === 'I' && m === '00304' && label.includes('WFE')) return true;
    return m === '00305';
  }
  if (occ.mosid === '00304') {
    if (tableId === 'I' && label.includes('WFE')) return false;
    return m === '00304';
  }
  if (occ.mosid === '00407') {
    return m === '00407' || m === '00407-02';
  }
  if (occ.mosid === '00404' || occ.mosid === '00405') {
    return m === occ.mosid || m.includes(occ.mosid);
  }
  return m === occ.mosid;
}

function matchesOfficerRow(occ: OccupationMaster, rowMosid: string | undefined, text: string): boolean {
  const upper = text.toUpperCase();
  if (occ.id === 'OFF-DEO') {
    return !rowMosid || rowMosid === 'GEN-OFF';
  }
  if (rowMosid && rowMosid.includes(occ.mosid)) return true;

  const mapKeywords: Record<string, string[]> = {
    '00393': ['MEDICAL OFFICER', 'MOTP', 'MÉD', 'MED ('],
    '00390': ['MEDICAL SPECIALIST', 'MOTP'],
    '00191': ['DENTAL', 'DOTP'],
    '00195': ['NURSING', 'NURSE PRACTITIONER'],
    '00198': ['SOCIAL WORK', 'SWO'],
    '00374': ['PHYSICIAN ASSISTANT', 'PA)'],
    '00204': ['LEGAL'],
    '00349': ['CHAPLAIN'],
    '00344': ['NCS ENG', 'ENGINEERING'],
    '00345': ['MS ENG', 'ENGINEERING'],
    '00181': ['ENGR', 'CELE', 'ENGINEERING'],
    '00187': ['EME', 'ENGINEERING'],
    '00185': ['AERE', 'ENGINEERING'],
    '00189': ['CE ', 'CONSTRUCTION ENGINEERING', 'ENGINEERING'],
  };

  const kws = mapKeywords[occ.mosid] ?? [occ.acronym.toUpperCase()];
  return kws.some((kw) => upper.includes(kw));
}

export function buildOccupationDossier(
  occupation: OccupationMaster,
  datasets: ActiveDatasets,
  force: 'reg' | 'res' = 'reg'
): OccupationDossierData {
  const isOfficer = occupation.personnelType === 'officer';
  const isReg = force === 'reg';
  const isRes = force === 'res';

  const regPayRows =
    !isReg || isOfficer
      ? []
      : datasets.listA.filter((r) => matchesMosidOrAlias(occupation, r.mosid, r.occupation, 'A'));

  const resPayRows =
    !isRes || isOfficer
      ? []
      : datasets.listF.filter((r) => matchesMosidOrAlias(occupation, r.mosid, r.occupation, 'F'));

  const officerRegRows =
    !isReg || !isOfficer
      ? []
      : datasets.listC.filter((r) =>
          matchesOfficerRow(occupation, r.mosid, `${r.productionPlan} ${r.applicableTo} ${r.conditions}`)
        );

  const officerAllowanceRows =
    !isReg || !isOfficer
      ? []
      : datasets.listD.filter((r) =>
          matchesOfficerRow(occupation, r.mosid, `${r.occupationLabel} ${r.qualificationsRequired}`)
        );

  const officerResRows =
    !isRes || !isOfficer
      ? []
      : datasets.listE.filter((r) =>
          matchesOfficerRow(occupation, r.mosid, `${r.productionPlan} ${r.applicableTo} ${r.conditions}`)
        );

  const careerProfiles =
    !isReg || isOfficer
      ? []
      : datasets.listH.filter((p) => matchesMosidOrAlias(occupation, p.mosid, p.occupationLabel, 'H'));

  const regPrograms =
    !isReg || isOfficer
      ? []
      : datasets.listB.filter((p) => matchesMosidOrAlias(occupation, p.mosid, p.occupation, 'B'));

  const resPrograms =
    !isRes || isOfficer
      ? []
      : datasets.listG.filter((p) => matchesMosidOrAlias(occupation, p.mosid, p.occupation, 'G'));

  const ncmstepPrograms =
    !isReg || isOfficer
      ? []
      : datasets.listI.filter((p) => matchesMosidOrAlias(occupation, p.mosid, p.occupation, 'I'));

  const coraEntry =
    !isReg || isOfficer
      ? undefined
      : datasets.listJ1.find((c) => matchesMosidOrAlias(occupation, c.mosid, c.occupation, 'J-1'));

  const nonOccIncentives = isOfficer
    ? []
    : datasets.listK.filter((k) => {
        const flag = (isReg ? k.applicableReg : k.applicableRes).trim().toLowerCase();
        return !flag.startsWith('no') && !flag.startsWith('non');
      });

  const leaveCredits = datasets.listL.filter((l) => {
    if (l.personnelGroup !== 'all' && l.personnelGroup !== occupation.personnelType) return false;
    const flag = (isReg ? l.applicableReg : l.applicableRes).trim().toLowerCase();
    return !flag.startsWith('no') && !flag.startsWith('non');
  });

  // Gather all note keys referenced by any visible section for the active force only
  const allNoteKeys: string[] = [];

  if (regPayRows.length > 0) {
    allNoteKeys.push('A:general:1', 'A:note:1', 'A:note:2', 'A:note:3');
    for (const r of regPayRows) allNoteKeys.push(...r.resolvedNoteKeys);
  }
  if (resPayRows.length > 0) {
    allNoteKeys.push('F:general:1', 'F:note:1', 'F:note:2');
    for (const r of resPayRows) allNoteKeys.push(...r.resolvedNoteKeys);
  }
  for (const r of officerRegRows) allNoteKeys.push(...r.resolvedNoteKeys);
  for (const r of officerAllowanceRows) allNoteKeys.push(...r.resolvedNoteKeys);
  for (const r of officerResRows) allNoteKeys.push(...r.resolvedNoteKeys);
  for (const cp of careerProfiles) allNoteKeys.push(...cp.resolvedNoteKeys);
  for (const p of regPrograms) allNoteKeys.push(...p.resolvedNoteKeys);
  for (const p of resPrograms) allNoteKeys.push(...p.resolvedNoteKeys);
  for (const p of ncmstepPrograms) allNoteKeys.push(...p.resolvedNoteKeys);

  if (coraEntry) {
    allNoteKeys.push('J-1:ref:A', 'J-1:ref:D', 'J-1:ref:E', 'J-1:ref:F');
  }
  for (const k of nonOccIncentives) allNoteKeys.push(...k.resolvedNoteKeys);
  for (const l of leaveCredits) allNoteKeys.push(...l.resolvedNoteKeys);

  const extraCodes = [occupation.mosid, occupation.acronym];
  if (occupation.mosid === '00407') extraCodes.push('CMD (PN)', '00407-02');

  const groupedFootnotes = resolveAndGroupFootnotes(
    allNoteKeys,
    datasets.footnoteMap,
    extraCodes,
    force
  );
  const totalLinkedNotes = groupedFootnotes.reduce((sum, g) => sum + g.notes.length, 0);

  return {
    occupation,
    regPayRows,
    resPayRows,
    officerRegRows,
    officerAllowanceRows,
    officerResRows,
    careerProfiles,
    regPrograms,
    resPrograms,
    ncmstepPrograms,
    coraEntry,
    nonOccIncentives,
    leaveCredits,
    groupedFootnotes,
    totalLinkedNotes,
  };
}
