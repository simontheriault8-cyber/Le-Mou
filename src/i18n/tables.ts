import type { Language, TableId } from '../types/mol';

export interface TableMeta {
  id: TableId;
  shortTitle: string;
  fullTitle: string;
  force: string;
}

export interface TablesDictionary {
  tables: Record<TableId, TableMeta>;
  sectionHeaders: {
    overview: string;
    regForcePay: string;
    resForcePay: string;
    officerAllowance: string;
    careerProfile: string;
    programsReg: string;
    programsRes: string;
    programsNcmstep: string;
    coraSection: string;
    nonOccSection: string;
    leaveCreditSection: string;
    footnotesRegister: string;
    linkedFootnotesCount: string;
    noEntriesForSection: string;
  };
  columns: {
    row: string;
    command: string;
    mosid: string;
    occupation: string;
    category: string;
    qualifications: string;
    rank: string;
    payIncrement: string;
    tcp: string;
    bypassed: string;
    allowance: string;
    notes: string;
    productionPlan: string;
    applicableTo: string;
    conditions: string;
    minService: string;
    paymentMethod: string;
    paymentDate: string;
    raTable: string;
    program: string;
    institution: string;
    meetsMajority: string;
    length: string;
    province: string;
    appendix: string;
    accreditation: string;
    location: string;
    publicPrivate: string;
    step: string;
    requirement: string;
    approxTime: string;
    effectiveDate: string;
    removalDate: string;
    endDate: string;
    priorExperience: string;
    criteria: string;
    incentiveCredit: string;
    leaveCredit: string;
  };
  compareView: {
    title: string;
    subtitle: string;
    leftOccupation: string;
    rightOccupation: string;
    swapButton: string;
    metricLabel: string;
    coraStatus: string;
    regCategories: string;
    resCategories: string;
    piesmrSteps: string;
    regProgramsCount: string;
    resProgramsCount: string;
    piesmrProgramsCount: string;
    keyNotesCount: string;
  };
  programsView: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allTables: string;
    regTablesOption: string;
    resTableBanner: string;
    allProvinces: string;
    allSector: string;
    publicOnly: string;
    privateOnly: string;
    showingCount: string;
    previousPage: string;
    nextPage: string;
  };
}

export const TABLES_DICT: Record<Language, TablesDictionary> = {
  fr: {
    tables: {
      A: { id: 'A', shortTitle: 'Liste A', fullTitle: 'Échelons de solde et indemnités — MR Force régulière', force: 'Force régulière' },
      B: { id: 'B', shortTitle: 'Liste B', fullTitle: 'Programmes et établissements — MR semi-qualifiés Force régulière', force: 'Force régulière' },
      C: { id: 'C', shortTitle: 'Liste C', fullTitle: 'Échelons de solde — Officiers Force régulière', force: 'Force régulière' },
      D: { id: 'D', shortTitle: 'Liste D', fullTitle: 'Indemnité de recrutement — Officiers Force régulière', force: 'Force régulière' },
      E: { id: 'E', shortTitle: 'Liste E', fullTitle: 'Échelons de solde — Officiers Force de réserve', force: 'Première réserve' },
      F: { id: 'F', shortTitle: 'Liste F', fullTitle: 'Échelons de solde — MR qualifiés et semi-qualifiés Force de réserve', force: 'Première réserve' },
      G: { id: 'G', shortTitle: 'Liste G', fullTitle: 'Programmes et établissements — MR semi-qualifiés Force de réserve', force: 'Première réserve' },
      H: { id: 'H', shortTitle: 'Liste H', fullTitle: 'Profil de carrière pour le PIESMR', force: 'Force régulière (PIESMR)' },
      I: { id: 'I', shortTitle: 'Liste I', fullTitle: 'Programmes et établissements du PIESMR', force: 'Force régulière (PIESMR)' },
      'J-1': { id: 'J-1', shortTitle: 'Liste J-1', fullTitle: 'Indemnité de recrutement pour les groupes professionnels critiques (IRGPC)', force: 'Force régulière' },
      K: { id: 'K', shortTitle: 'Liste K', fullTitle: 'Incitatifs à l’enrôlement non liés à un GPM pour MR', force: 'Régulière et Réserve' },
      L: { id: 'L', shortTitle: 'Liste L', fullTitle: 'Crédit de congés à l’enrôlement', force: 'Régulière et Réserve' },
    },
    sectionHeaders: {
      overview: 'Synthèse du groupe professionnel',
      regForcePay: 'Force régulière — Échelons de solde, ACA et indemnités',
      resForcePay: 'Première réserve — Échelons de solde et ACA',
      officerAllowance: 'Indemnité de recrutement des officiers (Liste D)',
      careerProfile: 'Profil de carrière PIESMR (Liste H)',
      programsReg: 'Programmes et établissements admissibles — Force régulière (Liste B)',
      programsRes: 'Programmes et établissements admissibles — Première réserve (Liste G)',
      programsNcmstep: 'Programmes et établissements subventionnés PIESMR (Liste I)',
      coraSection: 'Désignation IRGPC / CORA (Liste J-1)',
      nonOccSection: 'Incitatifs non liés à un GPM — Cadets, RJC et PEEFAC (Liste K)',
      leaveCreditSection: 'Crédit de congés à l’enrôlement (Liste L)',
      footnotesRegister: 'Registre consolidé des notes de bas de page liées',
      linkedFootnotesCount: 'notes liées',
      noEntriesForSection: 'Aucune entrée répertoriée dans cette liste pour ce métier.',
    },
    columns: {
      row: '#',
      command: 'Cmdt',
      mosid: 'ID SGPM',
      occupation: 'GPM',
      category: 'Catégorie',
      qualifications: 'Qualifications particulières requises',
      rank: 'Grade',
      payIncrement: 'Échelon de solde',
      tcp: 'ACA (jours)',
      bypassed: 'Cours contournés ou accordés',
      allowance: 'Indemnité de recrutement',
      notes: 'Notes liées',
      productionPlan: 'Plan de production',
      applicableTo: 'Applicable à',
      conditions: 'Condition(s)',
      minService: 'Service minimal',
      paymentMethod: 'Versement',
      paymentDate: 'Date de paiement',
      raTable: 'Tableau IR',
      program: 'Programme',
      institution: 'Établissement',
      meetsMajority: 'Majorité requise',
      length: 'Durée',
      province: 'Prov.',
      appendix: 'App.',
      accreditation: 'Accréditation',
      location: 'Lieu',
      publicPrivate: 'Secteur',
      step: 'Étape',
      requirement: 'Exigences à remplir',
      approxTime: 'Durée approx.',
      effectiveDate: 'Entrée en vigueur',
      removalDate: 'Retrait requis',
      endDate: 'Date de fin',
      priorExperience: 'Expérience antérieure',
      criteria: 'Critères à rencontrer',
      incentiveCredit: 'Crédit d’intéressement',
      leaveCredit: 'Crédit de congés',
    },
    compareView: {
      title: 'Comparateur de métiers côte à côte',
      subtitle: 'Comparez deux groupes professionnels militaires ou plans d’officiers à travers les 12 listes.',
      leftOccupation: 'Métier A',
      rightOccupation: 'Métier B',
      swapButton: 'Inverser A ↔ B',
      metricLabel: 'Critère comparé',
      coraStatus: 'Statut IRGPC (Liste J-1)',
      regCategories: 'Voies Force régulière (A / C)',
      resCategories: 'Voies Première réserve (E / F)',
      piesmrSteps: 'Étapes PIESMR (Liste H)',
      regProgramsCount: 'Programmes Force régulière (Liste B)',
      resProgramsCount: 'Programmes Réserve (Liste G)',
      piesmrProgramsCount: 'Programmes PIESMR (Liste I)',
      keyNotesCount: 'Notes de bas de page liées',
    },
    programsView: {
      title: 'Explorateur pancanadien des programmes et établissements',
      subtitle: 'Consultez l’ensemble des programmes répertoriés aux Listes B, G et I avec résolution directe des notes d’appendice.',
      searchPlaceholder: 'Filtrer par programme, collège, cégep, ville ou ID SGPM...',
      allTables: 'Toutes les listes (B, G, I)',
      regTablesOption: 'Toutes les listes Régulière (B, I)',
      resTableBanner: 'Liste G — Première réserve uniquement',
      allProvinces: 'Toutes les provinces',
      allSector: 'Public et privé',
      publicOnly: 'Public seulement',
      privateOnly: 'Privé seulement',
      showingCount: 'programmes affichés',
      previousPage: 'Précédent',
      nextPage: 'Suivant',
    },
  },
  en: {
    tables: {
      A: { id: 'A', shortTitle: 'List A', fullTitle: 'Pay Increments and Incentives — Reg F Skilled / Semi-Skilled NCMs', force: 'Regular Force' },
      B: { id: 'B', shortTitle: 'List B', fullTitle: 'Programs and Institutions — Semi-Skilled Reg F NCMs', force: 'Regular Force' },
      C: { id: 'C', shortTitle: 'List C', fullTitle: 'Pay Increments — Regular Force Officers', force: 'Regular Force' },
      D: { id: 'D', shortTitle: 'List D', fullTitle: 'Recruitment Allowance — Regular Force Officers', force: 'Regular Force' },
      E: { id: 'E', shortTitle: 'List E', fullTitle: 'Pay Increments — Reserve Force Officers', force: 'Primary Reserve' },
      F: { id: 'F', shortTitle: 'List F', fullTitle: 'Pay Increments — Reserve Force Skilled / Semi-Skilled NCMs', force: 'Primary Reserve' },
      G: { id: 'G', shortTitle: 'List G', fullTitle: 'Programs and Institutions — Semi-Skilled Reserve Force NCMs', force: 'Primary Reserve' },
      H: { id: 'H', shortTitle: 'List H', fullTitle: 'NCMSTEP Career Profile', force: 'Regular Force (NCMSTEP)' },
      I: { id: 'I', shortTitle: 'List I', fullTitle: 'NCMSTEP Programs and Institutions', force: 'Regular Force (NCMSTEP)' },
      'J-1': { id: 'J-1', shortTitle: 'List J-1', fullTitle: 'Critical Occupation Recruitment Allowance (CORA)', force: 'Regular Force' },
      K: { id: 'K', shortTitle: 'List K', fullTitle: 'Non-Occupation Specific Enrolment Incentives for NCMs', force: 'Regular & Reserve' },
      L: { id: 'L', shortTitle: 'List L', fullTitle: 'Leave Credit on Enrolment', force: 'Regular & Reserve' },
    },
    sectionHeaders: {
      overview: 'Occupation Summary',
      regForcePay: 'Regular Force — Pay Increments, TCP & Allowances',
      resForcePay: 'Primary Reserve — Pay Increments & TCP',
      officerAllowance: 'Officer Recruitment Allowance (List D)',
      careerProfile: 'NCMSTEP Career Profile (List H)',
      programsReg: 'Eligible Programs & Institutions — Regular Force (List B)',
      programsRes: 'Eligible Programs & Institutions — Primary Reserve (List G)',
      programsNcmstep: 'Subsidized NCMSTEP Programs & Institutions (List I)',
      coraSection: 'Critical Occupation Recruitment Allowance — CORA (List J-1)',
      nonOccSection: 'Non-Occupation Specific Incentives — Cadets, JCR & CAFIEP (List K)',
      leaveCreditSection: 'Leave Credit on Enrolment (List L)',
      footnotesRegister: 'Consolidated Linked Footnotes Register',
      linkedFootnotesCount: 'linked notes',
      noEntriesForSection: 'No entries listed in this table for the selected occupation.',
    },
    columns: {
      row: '#',
      command: 'Cmd',
      mosid: 'MOSID',
      occupation: 'OCC',
      category: 'Category',
      qualifications: 'Specific Qualification(s) Required',
      rank: 'Rank',
      payIncrement: 'Pay Increment',
      tcp: 'TCP (days)',
      bypassed: 'Bypassed or Awarded',
      allowance: 'Recruitment Allowance',
      notes: 'Linked Notes',
      productionPlan: 'Production Plan',
      applicableTo: 'Applicable to',
      conditions: 'Condition(s)',
      minService: 'Min. Service',
      paymentMethod: 'Payment Method',
      paymentDate: 'Payment Date',
      raTable: 'RA Table',
      program: 'Program',
      institution: 'Institution',
      meetsMajority: 'Meets Majority',
      length: 'Length',
      province: 'Prov.',
      appendix: 'App.',
      accreditation: 'Accreditation',
      location: 'Location',
      publicPrivate: 'Sector',
      step: 'Step',
      requirement: 'Requirements to Meet',
      approxTime: 'Approx. Time',
      effectiveDate: 'Effective Date',
      removalDate: 'Required Removal',
      endDate: 'End Date',
      priorExperience: 'Prior Experience',
      criteria: 'Criteria to Meet',
      incentiveCredit: 'Incentive Credit',
      leaveCredit: 'Leave Credit',
    },
    compareView: {
      title: 'Side-by-Side Occupation Comparator',
      subtitle: 'Compare any two Military Occupations or Officer entry plans across all 12 MOL tables.',
      leftOccupation: 'Occupation A',
      rightOccupation: 'Occupation B',
      swapButton: 'Swap A ↔ B',
      metricLabel: 'Comparison Criterion',
      coraStatus: 'CORA Status (List J-1)',
      regCategories: 'Regular Force Pathways (A / C)',
      resCategories: 'Primary Reserve Pathways (E / F)',
      piesmrSteps: 'NCMSTEP Steps (List H)',
      regProgramsCount: 'Regular Force Programs (List B)',
      resProgramsCount: 'Reserve Programs (List G)',
      piesmrProgramsCount: 'NCMSTEP Programs (List I)',
      keyNotesCount: 'Linked Footnotes',
    },
    programsView: {
      title: 'Pan-Canadian Program & Institution Explorer',
      subtitle: 'Search across all programs listed on Lists B, G, and I with instant appendix footnote resolution.',
      searchPlaceholder: 'Filter by program, college, CEGEP, city, or MOSID...',
      allTables: 'All Lists (B, G, I)',
      regTablesOption: 'All Regular Lists (B, I)',
      resTableBanner: 'List G — Primary Reserve only',
      allProvinces: 'All Provinces',
      allSector: 'Public & Private',
      publicOnly: 'Public Only',
      privateOnly: 'Private Only',
      showingCount: 'programs matching',
      previousPage: 'Previous',
      nextPage: 'Next',
    },
  },
};
