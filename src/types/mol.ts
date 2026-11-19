export type Language = 'fr' | 'en';

export type ForceType = 'reg' | 'res' | 'both';
export type PersonnelType = 'ncm' | 'officer';
export type TableId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J-1' | 'K' | 'L';
export type CommandCode = 'RCN' | 'CA' | 'RCAF' | 'CMP Health' | 'CMP Support' | 'CFINTCOM' | 'CFPM' | 'ALL';

export interface FootnoteEntry {
  key: string; // e.g., "A:general:1", "A:note:2", "B:app:29:note:1", "H:00366:note:1"
  tableId: TableId;
  scope: 'general' | 'note' | 'appendix' | 'occupation' | 'reference';
  appendix?: string;
  occupationCode?: string;
  noteNumber: string;
  title?: string;
  text: string;
}

export interface OccupationMaster {
  id: string; // MOSID (e.g. "00299") or Officer Plan ID (e.g. "OFF-00393")
  mosid: string;
  acronym: string;
  titleEn: string;
  titleFr: string;
  command: string;
  personnelType: PersonnelType;
  forces: ('reg' | 'res')[];
  coraEligible: boolean;
  isDiscontinued?: boolean;
  standUpNote?: string;
}

export interface NcmPayEntry {
  id: string;
  tableId: 'A' | 'F';
  rowNumber: number;
  command: string;
  mosid: string;
  occupation: string;
  category: string; // MOQ, CTQ, PSD/C, PSD/C #1, CTQ (1), etc.
  specificQualifications: string;
  rank: string;
  payIncrement: string;
  tcp: string;
  bypassedOrAwarded: string;
  recruitmentAllowance?: string; // List A only ($10k / $20k / Eff. date / CORA)
  coraFlag?: boolean;
  resolvedNoteKeys: string[];
}

export interface OfficerPayEntry {
  id: string;
  tableId: 'C' | 'E';
  rowNumber: number;
  productionPlan: string;
  applicableTo: string;
  mosid?: string;
  conditions: string;
  payIncrement: string;
  resolvedNoteKeys: string[];
}

export interface OfficerAllowanceEntry {
  id: string;
  tableId: 'D';
  rowNumber: number;
  occupationLabel: string;
  mosid?: string;
  effectiveDate?: string;
  qualificationsRequired: string;
  minimumServicePeriod: string;
  conditions: string;
  allowanceAmount: string;
  paymentMethod: string;
  paymentDate: string;
  raApplicableTable: string;
  resolvedNoteKeys: string[];
}

export interface ProgramEntry {
  id: string;
  tableId: 'B' | 'G' | 'I';
  rowNumber: number;
  mosid: string;
  occupation: string;
  command: string;
  program: string;
  institution: string;
  meetsMajority?: string;
  length: string;
  province: string;
  appendix?: string;
  noteRef: string;
  accreditationType?: string;
  location?: string;
  publicPrivate?: string;
  resolvedNoteKeys: string[];
}

export interface CareerProfileStep {
  step: number;
  requirement: string;
  rank: string;
  payIncrement: string;
  approxTime: string;
}

export interface CareerProfile {
  id: string;
  itemNumber: number;
  command: string;
  mosid: string;
  occupationLabel: string;
  headerNotice?: string;
  steps: CareerProfileStep[];
  occupationNotes: string[];
  resolvedNoteKeys: string[];
}

export interface CoraEntry {
  rowNumber: number;
  command: string;
  mosid: string;
  occupation: string;
  effectiveDate: string;
  requiredRemovalDate: string;
  endDate?: string;
  specialNote?: string;
}

export interface NonOccIncentiveEntry {
  rowNumber: number;
  priorExperience: string;
  criteria: string;
  rank: string;
  payIncrement: string;
  incentiveCredit: string;
  applicableReg: string;
  applicableRes: string;
  resolvedNoteKeys: string[];
}

export interface LeaveCreditEntry {
  rowNumber: number;
  personnelGroup: 'ncm' | 'officer' | 'all';
  rankOrApplicableTo: string;
  conditionOrPayIncrement: string;
  leaveCredit: string;
  applicableReg: string;
  applicableRes: string;
  resolvedNoteKeys: string[];
}
