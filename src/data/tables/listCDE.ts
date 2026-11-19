import type { OfficerAllowanceEntry, OfficerPayEntry } from '../../types/mol';

export const LIST_C_ENTRIES: OfficerPayEntry[] = [
  {
    id: 'C-1',
    tableId: 'C',
    rowNumber: 1,
    productionPlan: 'DEO/PEDO (DAOD 5002-2)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds a Baccalaureate degree that meets the ACCEPTABLE military occupation Entry Standards',
    payIncrement:
      'PI / ÉS 1: Second Lieutenant — Table "B" Pay Level "C" and "D" to CBI 204.211; Lieutenant — Table "C" Pay Level "C" and "D" to CBI 204.211',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-2',
    tableId: 'C',
    rowNumber: 2,
    productionPlan: 'DEO/PEDO (DAOD 5002-2)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds a Baccalaureate degree that meets the IDEAL military occupation Entry Standards',
    payIncrement:
      'PI / ÉS 2: Second Lieutenant — Table "B" Pay Level "C" and "D" to CBI 204.211; Lieutenant — Table "C" Pay Level "C" and "D" to CBI 204.211',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-3',
    tableId: 'C',
    rowNumber: 3,
    productionPlan: 'DEO/PEDO (DAOD 5002-2)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds any Master degree',
    payIncrement:
      'PI / ÉS 3: Second Lieutenant — Table "B" Pay Level "C" and "D" to CBI 204.211; Lieutenant — Table "C" Pay Level "C" and "D" to CBI 204.211',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-4',
    tableId: 'C',
    rowNumber: 4,
    productionPlan: 'DEO/PEDO (DAOD 5002-2)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds a Master degree that meets the IDEAL military occupation Entry Standards',
    payIncrement:
      'PI / ÉS 4: Second Lieutenant — Table "B" Pay Level "C" and "D" to CBI 204.211; Lieutenant — Table "C" Pay Level "C" and "D" to CBI 204.211',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-5',
    tableId: 'C',
    rowNumber: 5,
    productionPlan: 'DEO/PEDO (DAOD 5002-2)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds any PhD degree',
    payIncrement:
      'PI / ÉS 5: Second Lieutenant — Table "B" Pay Level "C" and "D" to CBI 204.211; Lieutenant — Table "C" Pay Level "C" and "D" to CBI 204.211',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-6',
    tableId: 'C',
    rowNumber: 6,
    productionPlan: 'All Officer Production Plans / Tous les plans de production d\'officiers',
    applicableTo:
      'An enrollee with previous military force experience, other than CAF or permanent armed forces of Her Majesty, that is of value to the CAF, where there has not been a continuous interruption of service of more than 5 years',
    conditions:
      'The applicable Occupational Authority has reviewed and determined that the previous or other military experience is relevant and of value to the assigned military occupation',
    payIncrement: 'Grant one (1) additional PI for each one (1) year of relevant military experience',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-7',
    tableId: 'C',
    rowNumber: 7,
    productionPlan: 'All Officer Production Plans / Tous les plans de production d\'officiers',
    applicableTo:
      'An enrollee with civilian experience that is of value to the assigned military occupation',
    conditions:
      'The applicable Occupational Authority has reviewed and determined that the civilian experience is relevant and of value to the assigned military occupation',
    payIncrement: 'Grant one (1) additional PI for every two (2) years of relevant civilian experience (see note 1)',
    resolvedNoteKeys: ['C:note:1', 'C:note:4'],
  },
  {
    id: 'C-8',
    tableId: 'C',
    rowNumber: 8,
    productionPlan: 'DEO/PEDO (CAFMPI xx/25 to be published)',
    applicableTo: 'Physician Assistant (MOSID 00374) enrollee / Adjoint-au médecin (ID SGPM 00374)',
    mosid: '00374',
    conditions: 'Holds a Physician Assistant bachelor\'s or master\'s degree AND successful completion of certification exam. Direct Entry Officer enrollees in PA (00374) promoted to Capt / Lt(N) on enrolment.',
    payIncrement:
      'PI / ÉS 2 (Captain) — Eff. date: 4 December 2025 (Ref A: CMP2025-008240; Ref B: DPPD 8 Dec 2025)',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-9',
    tableId: 'C',
    rowNumber: 9,
    productionPlan: 'SOTP/PFOS (DAOD 5002-13)',
    applicableTo: 'Medical Officer (MOSID 00393) / Médecin militaire (ID SGPM 00393)',
    mosid: '00393',
    conditions:
      'Medical Officer applicants enrolled under a subsidized educational program and undergoing CCFP and CCFP(EM) training',
    payIncrement:
      'PI / ÉS 6: Lieutenant — Table "C" Pay Level "C" to CBI 204.211. Grant (1) additional PI for every one (1) year completed of the three year residency program (see note 5).',
    resolvedNoteKeys: ['C:note:5', 'C:note:4'],
  },
  {
    id: 'C-10',
    tableId: 'C',
    rowNumber: 10,
    productionPlan: 'SOTP/PFOS (DAOD 5002-13)',
    applicableTo: 'Dental Officer (MOSID 00191) / Dentiste militaire (ID SGPM 00191)',
    mosid: '00191',
    conditions: 'Dental Officer applicants enrolled under a subsidized educational program',
    payIncrement:
      'PI / ÉS 1: Second Lieutenant — Table "B" Pay Level "C" to CBI 204.211 / Lieutenant — Table "C" Pay Level "C" to CBI 204.211',
    resolvedNoteKeys: ['C:note:4'],
  },
  {
    id: 'C-11',
    tableId: 'C',
    rowNumber: 11,
    productionPlan: 'SOTP/PFOS (DAOD 5002-13)',
    applicableTo: 'Medical Specialist Officer (MOSID 00390) / Médecin spécialiste (ID SGPM 00390)',
    mosid: '00390',
    conditions: 'Medical Specialist applicant enrolled under a subsidized educational program',
    payIncrement: 'See Note 3 / Voir note 3 (Lt PI 6-8 Table C Level C; Capt PI 3-4 Table A; or Capt PI 1-5 Table C CBI 204.216)',
    resolvedNoteKeys: ['C:note:3', 'C:note:4'],
  },
  {
    id: 'C-12',
    tableId: 'C',
    rowNumber: 12,
    productionPlan: 'DEO/PEDO Specialist Occupations enrolled as Capt, Maj or LCol',
    applicableTo:
      'Medical Officer (00393), Medical Specialist Officer (00390), Dental Officer (00191), Chaplain (00349), Legal Officer (00204)',
    conditions:
      'The applicable Occupational Authority has reviewed and determined that the enrollee\'s civilian experience is relevant and of value to the assigned military occupation',
    payIncrement:
      'Grant one (1) additional PI for every two (2) years of relevant civilian experience (See Note 2)',
    resolvedNoteKeys: ['C:note:1', 'C:note:2', 'C:note:4'],
  },
  {
    id: 'C-13',
    tableId: 'C',
    rowNumber: 13,
    productionPlan: 'Direct Entry (DAOD 5002-2)',
    applicableTo: 'Nursing (MOSID 00195) enrollee / en soins infirmiers (ID SGPM 00195)',
    mosid: '00195',
    conditions:
      'Direct Entry Nursing Officer applicants who have successfully completed a Masters in Nursing, Nurse Practitioner program and hold a valid license to practice as a Nurse Practitioner',
    payIncrement: 'PI / ÉS 9: Lieutenant — Table "C" — Pay Level "C" to CBI 204.211',
    resolvedNoteKeys: ['C:note:1', 'C:note:4'],
  },
  {
    id: 'C-14',
    tableId: 'C',
    rowNumber: 14,
    productionPlan: 'Direct Entry (DAOD 5002-2)',
    applicableTo: 'Nursing (MOSID 00195) enrollee / en soins infirmiers (ID SGPM 00195)',
    mosid: '00195',
    conditions:
      'Direct Entry Nursing Officer applicants who have successfully completed a Baccalaureate in Nursing and a current licence (practicing with active registration) as a Registered Nurse from a Canadian provincial or territorial regulatory authority',
    payIncrement: 'PI / ÉS 6: Lieutenant — Table "C" Pay Level "C" to CBI 204.211',
    resolvedNoteKeys: ['C:note:1', 'C:note:4'],
  },
  {
    id: 'C-15',
    tableId: 'C',
    rowNumber: 15,
    productionPlan: 'DEO/PEDO (DAOD 5002-2)',
    applicableTo: 'Social Work (MOSID 00198) / Travail Social (ID SGPM 00198)',
    mosid: '00198',
    conditions:
      'Direct Entry Officer enrollees in the Social Work Occupation MOSID 00198 will be promoted to the rank of Lieutenant on enrolment',
    payIncrement: 'PI / ÉS 8: Lieutenant — Table "C" Pay Level "C" to CBI 204.211',
    resolvedNoteKeys: ['C:note:4'],
  },
];

export const LIST_D_ENTRIES: OfficerAllowanceEntry[] = [
  {
    id: 'D-1',
    tableId: 'D',
    rowNumber: 1,
    occupationLabel: 'MED 00393 - Medical Officer and MED SPEC 00390 - Medical Specialist (Licensed)',
    mosid: '00393',
    effectiveDate: '30 Sep 20',
    qualificationsRequired: 'Possesses a license to carry out the unrestricted practice of medicine in Canada.',
    minimumServicePeriod: 'Commencing on the date of enrolment or component transfer, four years in that military occupation.',
    conditions: 'CBI 205.525 - (2 to 7)',
    allowanceAmount: '$225K',
    paymentMethod: 'Lump Sum / montant forfaitaire',
    paymentDate: 'On the date of enrolment or component transfer',
    raApplicableTable: 'See notes 1-3 and CBI 205.525 Table A',
    resolvedNoteKeys: ['D:note:1', 'D:note:2', 'D:note:3'],
  },
  {
    id: 'D-2',
    tableId: 'D',
    rowNumber: 2,
    occupationLabel: 'MED 00393 - Medical Officer Training Plan (MOTP)',
    mosid: '00393',
    effectiveDate: '30 Sep 20',
    qualificationsRequired:
      'Enrolled or component transferred as an Officer to attend an approved Canadian medical school UGME and/or PGME (Family Medicine Residency CCFP/CFPC-EM or Sports and Exercise Medicine residency) under QR&O 15.07.',
    minimumServicePeriod:
      'Commencing on the date they possess a license to carry out the unrestricted practice of medicine in Canada, four years in that military occupation.',
    conditions:
      'CBI 205.525 - (2 to 7) — The Officer has not previously received publicly subsidized education leading to their current medical degree.',
    allowanceAmount:
      'Variable: $180,000 (license <= 12 mos); $150,000 (>12 to 24 mos); $110,000 (>24 to 36 mos); $75,000 (>36 to 48 mos); $40,000 (>48 mos)',
    paymentMethod: 'Lump Sum / montant forfaitaire',
    paymentDate: 'On the date of enrolment',
    raApplicableTable: 'See notes 1-3 and CBI 205.525 Table E',
    resolvedNoteKeys: ['D:note:1', 'D:note:2', 'D:note:3'],
  },
  {
    id: 'D-3',
    tableId: 'D',
    rowNumber: 3,
    occupationLabel: 'MED SPEC 00390 - Medical Specialist Officer (MOTP)',
    mosid: '00390',
    effectiveDate: '30 Sep 20',
    qualificationsRequired:
      'Enrolled or component transferred as an officer currently accepted into a Canadian specialty residency program for a clinical specialty as defined in CBI 204.216.',
    minimumServicePeriod:
      'Commencing on the later of completing their residency program and becoming a member in a Royal College for their clinical specialty, five years in that military occupation.',
    conditions:
      'CBI 205.525 - (2 to 7) — The officer has not previously received publicly subsidized education leading to their current medical degree.',
    allowanceAmount:
      'Variable: $215,000 if residency completed in 12 months or less; OR $180,000 if completed in >12 and up to 24 months.',
    paymentMethod: 'Lump Sum / montant forfaitaire',
    paymentDate: 'On the date of enrolment',
    raApplicableTable: 'See notes 1-3 and CBI 205.525 Table D',
    resolvedNoteKeys: ['D:note:1', 'D:note:2', 'D:note:3'],
  },
  {
    id: 'D-4',
    tableId: 'D',
    rowNumber: 4,
    occupationLabel: 'NCS ENG 00344 / SYST CBT MAR',
    mosid: '00344',
    effectiveDate: '1 Apr 23',
    qualificationsRequired:
      'Possesses an engineering or science degree that is recognized by a Canadian university and suitable for the specific military occupation.',
    minimumServicePeriod:
      'Commencing on the date of enrolment, component transfer, or other entry into the specific military occupation, four years in that specific military occupation.',
    conditions: 'CBI 205.525 - (2 to 7)',
    allowanceAmount: '$40,000',
    paymentMethod: 'Two instalments / deux versements',
    paymentDate:
      '1st instalment on date of successfully completing Basic Officer Training (or credited); 2nd instalment 24 months after 1st instalment if still serving as an engineering officer in assigned understrength occupation.',
    raApplicableTable: 'CBI 205.525 Table K',
    resolvedNoteKeys: ['D:note:1', 'D:note:2'],
  },
  {
    id: 'D-5',
    tableId: 'D',
    rowNumber: 5,
    occupationLabel: 'MS ENG 00345',
    mosid: '00345',
    effectiveDate: '1 Apr 23',
    qualificationsRequired:
      'Possesses an engineering or science degree that is recognized by a Canadian university and suitable for the specific military occupation.',
    minimumServicePeriod:
      'Commencing on the date of enrolment, component transfer, or other entry into the specific military occupation, four years in that specific military occupation.',
    conditions: 'CBI 205.525 - (2 to 7)',
    allowanceAmount: '$40,000',
    paymentMethod: 'Two instalments / deux versements',
    paymentDate:
      '1st instalment on date of successfully completing Basic Officer Training (or credited); 2nd instalment 24 months after 1st instalment if still serving as an engineering officer in assigned understrength occupation.',
    raApplicableTable: 'CBI 205.525 Table K',
    resolvedNoteKeys: ['D:note:1', 'D:note:2'],
  },
  {
    id: 'D-6',
    tableId: 'D',
    rowNumber: 6,
    occupationLabel: 'ENGR 00181',
    mosid: '00181',
    effectiveDate: '1 Apr 23',
    qualificationsRequired:
      'Possesses an engineering or science degree that is recognized by a Canadian university and suitable for the specific military occupation.',
    minimumServicePeriod:
      'Commencing on the date of enrolment, component transfer, or other entry into the specific military occupation, four years in that specific military occupation.',
    conditions: 'CBI 205.525 - (2 to 7)',
    allowanceAmount: '$40,000',
    paymentMethod: 'Two instalments / deux versements',
    paymentDate:
      '1st instalment on date of successfully completing Basic Officer Training (or credited); 2nd instalment 24 months after 1st instalment if still serving as an engineering officer in assigned understrength occupation.',
    raApplicableTable: 'CBI 205.525 Table K',
    resolvedNoteKeys: ['D:note:1', 'D:note:2'],
  },
  {
    id: 'D-7',
    tableId: 'D',
    rowNumber: 7,
    occupationLabel: 'EME 00187',
    mosid: '00187',
    effectiveDate: '1 Apr 23',
    qualificationsRequired:
      'Possesses an engineering or science degree that is recognized by a Canadian university and suitable for the specific military occupation.',
    minimumServicePeriod:
      'Commencing on the date of enrolment, component transfer, or other entry into the specific military occupation, four years in that specific military occupation.',
    conditions: 'CBI 205.525 - (2 to 7)',
    allowanceAmount: '$40,000',
    paymentMethod: 'Two instalments / deux versements',
    paymentDate:
      '1st instalment on date of successfully completing Basic Officer Training (or credited); 2nd instalment 24 months after 1st instalment if still serving as an engineering officer in assigned understrength occupation.',
    raApplicableTable: 'CBI 205.525 Table K',
    resolvedNoteKeys: ['D:note:1', 'D:note:2'],
  },
  {
    id: 'D-8',
    tableId: 'D',
    rowNumber: 8,
    occupationLabel: 'AERE 00185 - Aerospace Engineering Officer',
    mosid: '00185',
    effectiveDate: '1 Apr 23',
    qualificationsRequired:
      'Possesses an engineering or science degree that is recognized by a Canadian university and suitable for the specific military occupation.',
    minimumServicePeriod:
      'Commencing on the date of enrolment, component transfer, or other entry into the specific military occupation, four years in that specific military occupation.',
    conditions: 'CBI 205.525 - (2 to 7)',
    allowanceAmount: '$40,000',
    paymentMethod: 'Two instalments / deux versements',
    paymentDate:
      '1st instalment on date of successfully completing Basic Officer Training (or credited); 2nd instalment 24 months after 1st instalment if still serving as an engineering officer in assigned understrength occupation.',
    raApplicableTable: 'CBI 205.525 Table K',
    resolvedNoteKeys: ['D:note:1', 'D:note:2'],
  },
  {
    id: 'D-9',
    tableId: 'D',
    rowNumber: 9,
    occupationLabel: 'CE Officer 00189 - Construction Engineering Officer',
    mosid: '00189',
    effectiveDate: '1 Apr 24',
    qualificationsRequired:
      'Possesses an engineering or science degree that is recognized by a Canadian university and suitable for the specific military occupation.',
    minimumServicePeriod:
      'Commencing on the date of enrolment, component transfer, or other entry into the specific military occupation, four years in that specific military occupation.',
    conditions: 'CBI 205.525 - (2 to 7)',
    allowanceAmount: '$40,000',
    paymentMethod: 'Two instalments / deux versements',
    paymentDate:
      '1st instalment on date of successfully completing Basic Officer Training (or credited); 2nd instalment 24 months after 1st instalment if still serving as an engineering officer in assigned understrength occupation.',
    raApplicableTable: 'CBI 205.525 Table K',
    resolvedNoteKeys: ['D:note:1', 'D:note:2'],
  },
];

export const LIST_E_ENTRIES: OfficerPayEntry[] = [
  {
    id: 'E-1',
    tableId: 'E',
    rowNumber: 1,
    productionPlan: 'Direct Entry (CFAO 49-10)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds a Baccalaureate degree that meets the ACCEPTABLE military occupation Entry Standards',
    payIncrement:
      'PI / ÉS 1: Second Lieutenant — Table "B" and "C" Pay Level "A" to CBI 204.52 (NO NCM Service); Lieutenant — Table "B" and "C" Pay Level "A" to CBI 204.52 (NO NCM Service)',
    resolvedNoteKeys: ['E:note:3'],
  },
  {
    id: 'E-2',
    tableId: 'E',
    rowNumber: 2,
    productionPlan: 'Direct Entry (CFAO 49-10)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds a Baccalaureate degree that meets the IDEAL military occupation Entry Standards',
    payIncrement:
      'PI / ÉS 2: Second Lieutenant — Table "B" and "C" Pay Level "A" to CBI 204.52 (NO NCM Service); Lieutenant — Table "B" and "C" Pay Level "A" to CBI 204.52 (NO NCM Service)',
    resolvedNoteKeys: ['E:note:3'],
  },
  {
    id: 'E-3',
    tableId: 'E',
    rowNumber: 3,
    productionPlan: 'Direct Entry (CFAO 49-10)',
    applicableTo: 'Graduate of an accredited Canadian institution or equivalent',
    conditions: 'Holds any Master degree OR Holds any PhD Degree',
    payIncrement:
      'PI / ÉS 3: Second Lieutenant — Table "B" and "C" Pay Level "A" to CBI 204.52 (NO NCM Service); Lieutenant — Table "B" and "C" Pay Level "A" to CBI 204.52 (NO NCM Service)',
    resolvedNoteKeys: ['E:note:3'],
  },
  {
    id: 'E-4',
    tableId: 'E',
    rowNumber: 4,
    productionPlan: 'Direct Entry (CFAO 49-10)',
    applicableTo:
      'An enrollee with previous military force experience, other than CAF or permanent armed forces of Her Majesty, that is of value to the CAF, where there has not been a continuous interruption of service of more than 5 years',
    conditions:
      'The applicable Occupation Authority has reviewed and determined that the previous or other military experience is relevant and of value to the CAF',
    payIncrement: 'Grant one (1) additional PI for each one (1) year of relevant military experience',
    resolvedNoteKeys: ['E:note:3'],
  },
  {
    id: 'E-5',
    tableId: 'E',
    rowNumber: 5,
    productionPlan: 'All Officer Production Plans',
    applicableTo: 'An enrollee to Res F HCM with civilian experience that is of value to the assigned military occupation',
    conditions:
      'The applicable Occupation Authority has reviewed and determined that the civilian experience is relevant and of value to the assigned military occupation',
    payIncrement: 'Grant one (1) additional PI for every two (2) years of relevant civilian experience (See Note 1)',
    resolvedNoteKeys: ['E:note:1', 'E:note:3'],
  },
  {
    id: 'E-6',
    tableId: 'E',
    rowNumber: 6,
    productionPlan: 'DEO/PEDO (CAFMPI xx/25 to be published)',
    applicableTo: 'Physician Assistant (MOSID 00374) enrollee / Adjoint-au médecin (ID SGPM 00374)',
    mosid: '00374',
    conditions:
      'Holds a Physician Assistant bachelor\'s or master\'s degree AND successful completion of certification exam. Direct Entry Officer enrollees in PA (00374) promoted to Capt / Lt(N) on enrolment.',
    payIncrement:
      'PI / ÉS 2 (Captain) — Eff. date: 4 December 2025 (Ref A: CMP2025-008240; Ref B: DPPD 8 Dec 2025)',
    resolvedNoteKeys: ['E:note:3'],
  },
  {
    id: 'E-7',
    tableId: 'E',
    rowNumber: 7,
    productionPlan: 'Direct Entry (CFAO 49-10)',
    applicableTo: 'Nursing (NUR 00195) enrollee',
    mosid: '00195',
    conditions:
      'Direct Entry Nursing Officer applicants who have successfully completed a Masters in Nursing, Nurse Practitioner program and hold a valid license to practice as a Nurse Practitioner',
    payIncrement: 'PI / ÉS 4: Lieutenant — CBI 204.52 Table "B" Level "A" (if no NCM service)',
    resolvedNoteKeys: ['E:note:1', 'E:note:3'],
  },
  {
    id: 'E-8',
    tableId: 'E',
    rowNumber: 8,
    productionPlan: 'Direct Entry (CFAO 49-10)',
    applicableTo: 'Nursing (MOSID 00195) enrollee / en soins infirmiers (ID SGPM 00195)',
    mosid: '00195',
    conditions:
      'Direct Entry Nursing Officer applicants who have successfully completed a Baccalaureate in Nursing and a current licence (practicing with active registration) as a Registered Nurse from a Canadian provincial or territorial regulatory authority',
    payIncrement: 'PI / ÉS 4: Lieutenant — CBI 204.52 Table "B" Level "A" (if no NCM service)',
    resolvedNoteKeys: ['E:note:1', 'E:note:3'],
  },
  {
    id: 'E-9',
    tableId: 'E',
    rowNumber: 9,
    productionPlan: 'All Officer Production Plans — Specialists enrolled as Capt or Maj',
    applicableTo:
      'Medical Officer (00393), Medical Specialist Officer (00390), Dental Officer (00191), Legal Officer (00204), Chaplain (00349)',
    conditions:
      'The applicable Occupational Authority has reviewed and determined that the enrollee\'s civilian experience is relevant and of value at the assigned military occupation',
    payIncrement: 'Grant one (1) additional PI for every two (2) years of relevant civilian experience (See Note 2)',
    resolvedNoteKeys: ['E:note:1', 'E:note:2', 'E:note:3'],
  },
  {
    id: 'E-10',
    tableId: 'E',
    rowNumber: 10,
    productionPlan: 'Direct Entry (CFAO 49-10)',
    applicableTo: 'Social Work (MOSID 00198) / Travail Social (ID SGPM 00198) — Eff. 08 June 2026',
    mosid: '00198',
    conditions:
      'Direct Entry Officer enrollees in the Social Work Occupation MOSID 00198 will be promoted to the rank of Lieutenant on enrolment (Effective 08 June 2026)',
    payIncrement: 'PI / ÉS 4: Lieutenant — CBI 204.52 Table "B" Level "A" (if no NCM service)',
    resolvedNoteKeys: ['E:note:3'],
  },
];
