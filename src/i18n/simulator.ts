import type { Language } from '../types/mol';

export interface SimulatorDictionary {
  title: string;
  subtitle: string;
  forceLabel: string;
  personnelLabel: string;
  occupationLabel: string;
  pathwayLabel: string;
  experienceYearsLabel: string;
  diplomaAgeLabel: string;
  diplomaRecent: string;
  diplomaOverFiveYears: string;
  youthProgramLabel: string;
  youthNone: string;
  youthCadets3: string;
  youthCadets4: string;
  youthCadets5: string;
  youthJcr3: string;
  youthJcr4: string;
  youthJcr5: string;
  youthCafiep: string;
  priorCafServiceLabel: string;
  priorCafNone: string;
  priorCafLess5: string;
  priorCafMore5: string;
  resultsTitle: string;
  entryRank: string;
  startingPi: string;
  tcpCredit: string;
  leaveCredit: string;
  allowanceOutcome: string;
  bypassedOutcome: string;
  warningsTitle: string;
  governingNotesTitle: string;
  plarAlertOver5: string;
  coraNonCombineAlert: string;
  cadetConflictAlert: string;
  cadetResNote: string;
  cafiepResNote: string;
  moqLeaveNote: string;
}

export const SIMULATOR_DICT: Record<Language, SimulatorDictionary> = {
  fr: {
    title: 'Simulateur d’admissibilité et de reconnaissance des acquis',
    subtitle:
      'Évaluez le grade à l’enrôlement, l’échelon de solde, l’ACA, les indemnités et le crédit de congés en croisant les Listes A à L.',
    forceLabel: 'Élément constitutif',
    personnelLabel: 'Catégorie de personnel',
    occupationLabel: 'Métier ou plan visé',
    pathwayLabel: 'Voie d’entrée / Catégorie (Liste A, C, E ou F)',
    experienceYearsLabel: 'Années d’expérience civile ou militaire pertinente',
    diplomaAgeLabel: 'Ancienneté du diplôme ou de la certification civile',
    diplomaRecent: 'Moins de 5 ans (ou emploi continu dans le domaine)',
    diplomaOverFiveYears: 'Plus de 5 ans sans emploi continu dans le domaine',
    youthProgramLabel: 'Incitatif jeunesse / Programme spécial (Liste K)',
    youthNone: 'Aucun',
    youthCadets3: 'Cadets — 3 ans complétés (180 jours)',
    youthCadets4: 'Cadets — 4 ans complétés (270 jours)',
    youthCadets5: 'Cadets — 5 ans complétés (365 jours)',
    youthJcr3: 'Rangers juniors canadiens (RJC) — 3 ans (180 jours)',
    youthJcr4: 'Rangers juniors canadiens (RJC) — 4 ans (270 jours)',
    youthJcr5: 'Rangers juniors canadiens (RJC) — 5 ans (365 jours)',
    youthCafiep: 'PEEFAC (CAFIEP) + QMB complétée (ÉS 2)',
    priorCafServiceLabel: 'Service antérieur dans les FAC (pour GPMQ)',
    priorCafNone: 'Aucun service antérieur (candidat civil)',
    priorCafLess5: 'Ancien membre — moins de 5 ans depuis la libération',
    priorCafMore5: 'Ancien membre — plus de 5 ans (ou transfert de la Réserve)',
    resultsTitle: 'Résultat consolidé de l’évaluation',
    entryRank: 'Grade à l’enrôlement',
    startingPi: 'Échelon de solde estimé',
    tcpCredit: 'Crédit d’ancienneté (ACA / TCP)',
    leaveCredit: 'Crédit de congés à l’enrôlement (Liste L)',
    allowanceOutcome: 'Indemnité de recrutement / IRGPC',
    bypassedOutcome: 'Qualifications accordées et formation delta requise',
    warningsTitle: 'Alertes réglementaires et vérifications obligatoires',
    governingNotesTitle: 'Notes directrices applicables à ce scénario',
    plarAlertOver5:
      'Diplôme obtenu il y a plus de 5 ans : une ERA (PLAR) auprès de l’AGPM est obligatoire si le candidat n’a pas exercé dans le métier civil (Notes des Listes B/G).',
    coraNonCombineAlert:
      'Règle de non-cumul (DRAS 205.525(10)) : l’admissibilité à l’IRGPC (Liste J-1) annule toute autre indemnité de recrutement prévue à la Liste A.',
    cadetConflictAlert:
      'Liste K, Note 2 : le crédit Cadets/RJC ne peut pas être cumulé avec l’incitatif temporaire ÉS 2. Le mécanisme le plus avantageux pour le candidat s’applique.',
    cadetResNote:
      'Liste K, Note 1 : le crédit Cadets/RJC ne s’applique qu’à l’enrôlement initial et n’est pas accordé lors d’un transfert entre éléments constitutifs.',
    cafiepResNote: 'Liste K : l’incitatif PEEFAC (CAFIEP) s’applique uniquement à la Force régulière, non à la Première réserve.',
    moqLeaveNote:
      'Liste L : le crédit de congés à l’enrôlement ne s’applique pas aux candidats MR GPMQ (leur service antérieur est déjà calculé selon l’ORFC 16.14).',
  },
  en: {
    title: 'Candidate Eligibility & Prior Learning Simulator',
    subtitle:
      'Estimate entry rank, pay increment, TCP, recruitment allowances, and leave credit by cross-evaluating Lists A through L.',
    forceLabel: 'Component / Force',
    personnelLabel: 'Personnel Stream',
    occupationLabel: 'Target Occupation or Plan',
    pathwayLabel: 'Applicant Category / Production Plan (List A, C, E, or F)',
    experienceYearsLabel: 'Years of Relevant Civilian or Military Experience',
    diplomaAgeLabel: 'Age of Civilian Diploma or Trade Certification',
    diplomaRecent: 'Within 5 years (or continuously employed in occupation)',
    diplomaOverFiveYears: 'More than 5 years ago without continuous employment',
    youthProgramLabel: 'Non-Occupation Specific Incentive (List K)',
    youthNone: 'None',
    youthCadets3: 'Cadets — 3 years completed (180 days)',
    youthCadets4: 'Cadets — 4 years completed (270 days)',
    youthCadets5: 'Cadets — 5 years completed (365 days)',
    youthJcr3: 'Junior Canadian Rangers (JCR) — 3 years (180 days)',
    youthJcr4: 'Junior Canadian Rangers (JCR) — 4 years (270 days)',
    youthJcr5: 'Junior Canadian Rangers (JCR) — 5 years (365 days)',
    youthCafiep: 'CAFIEP + Basic Military Qualification (PI 2)',
    priorCafServiceLabel: 'Prior CAF Service (for MOQ applicants)',
    priorCafNone: 'No prior CAF service (civilian applicant)',
    priorCafLess5: 'Former member — less than 5 years since departing CAF',
    priorCafMore5: 'Former member — over 5 years (or Reserve Component Transfer)',
    resultsTitle: 'Consolidated Assessment Output',
    entryRank: 'Entry Rank',
    startingPi: 'Estimated Starting Pay Increment',
    tcpCredit: 'Time Credit for Promotion (TCP)',
    leaveCredit: 'Leave Credit on Enrolment (List L)',
    allowanceOutcome: 'Recruitment Allowance / CORA',
    bypassedOutcome: 'Qualifications Granted & Mandatory Delta Training',
    warningsTitle: 'Regulatory Alerts & Mandatory Checks',
    governingNotesTitle: 'Governing Notes for This Scenario',
    plarAlertOver5:
      'Diploma older than 5 years: a PLAR submission to the Occupation Authority (OA) is mandatory unless continuously employed in the occupation (Lists B/G Notes).',
    coraNonCombineAlert:
      'Non-combinability rule (CBI 205.525(10)): entitlement to CORA (List J-1) supersedes and cancels any recruitment allowance under List A.',
    cadetConflictAlert:
      'List K, Note 2: Cadet/JCR credit cannot be combined with the temporary PI 2 incentive; the more advantageous incentive applies.',
    cadetResNote:
      'List K, Note 1: Cadet/JCR credit is a one-time enrolment recognition and is not granted upon subsequent component transfer.',
    cafiepResNote: 'List K: CAFIEP incentive applies to Regular Force NCM applicants only (not Primary Reserve).',
    moqLeaveNote:
      'List L: Leave Credit on Enrolment does not apply to MOQ NCM applicants (prior service is already calculated IAW QR&O 16.14).',
  },
};
