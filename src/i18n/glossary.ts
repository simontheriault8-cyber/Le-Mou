import type { Language } from '../types/mol';

export interface GlossaryTerm {
  code: string;
  label: string;
  definition: string;
}

export interface GlossaryDictionary {
  sectionTitle: string;
  regularForce: string;
  reserveForce: string;
  ncmLabel: string;
  officerLabel: string;
  coraEligible: string;
  coraNotListed: string;
  discontinued: string;
  provisionalWarning: string;
  originalOfficialTextNote: string;
  terms: Record<string, GlossaryTerm>;
}

export const GLOSSARY_DICT: Record<Language, GlossaryDictionary> = {
  fr: {
    sectionTitle: 'Terminologie et sigles réglementaires',
    regularForce: 'Force régulière',
    reserveForce: 'Première réserve',
    ncmLabel: 'Militaire du rang (MR)',
    officerLabel: 'Officier',
    coraEligible: 'Admissible IRGPC (Liste J-1)',
    coraNotListed: 'Non désigné IRGPC',
    discontinued: 'N’est plus offert',
    provisionalWarning: 'Qualification provisoire (formation delta / ECE requise)',
    originalOfficialTextNote:
      'Les extraits réglementaires ci-dessous conservent le libellé officiel exact des tableaux LGPM 26/27 V4.',
    terms: {
      MOSID: {
        code: 'ID SGPM',
        label: 'Identifiant de la structure des groupes professionnels militaires',
        definition: 'Code numérique unique à 5 chiffres identifiant chaque métier des FAC.',
      },
      MOQ: {
        code: 'GPMQ',
        label: 'Groupe professionnel militaire qualifié',
        definition: 'Candidat qualifié déjà formé dans le GPM (enrôlement antérieur ou transfert).',
      },
      CTQ: {
        code: 'QPC',
        label: 'Qualification professionnelle civile',
        definition: 'Candidat semi-qualifié dont la formation, l’expérience ou la certification civile (p. ex. Sceau rouge) équivaut à une grande partie de l’instruction professionnelle.',
      },
      'PSD/C': {
        code: 'D/C-PS',
        label: 'Diplôme ou certificat postsecondaire',
        definition: 'Candidat semi-qualifié titulaire d’un diplôme ou certificat admissible figurant aux Listes B ou G.',
      },
      TCP: {
        code: 'ACA',
        label: 'Ancienneté comptant pour l’avancement',
        definition: 'Crédit de jours civils accordé à l’enrôlement accélérant la promotion au grade supérieur.',
      },
      PI: {
        code: 'ÉS',
        label: 'Échelon de solde',
        definition: 'Niveau de rémunération initial déterminé par l’APIR ou l’AGPM (DRAS 204.015 / 204.511).',
      },
      PLAR: {
        code: 'ERA',
        label: 'Évaluation et reconnaissance des acquis',
        definition: 'Processus officiel auprès de l’autorité de gestion du GPM (AGPM) pour évaluer un programme non répertorié ou une expérience antérieure.',
      },
      CORA: {
        code: 'IRGPC',
        label: 'Indemnité de recrutement pour les groupes professionnels critiques',
        definition: 'Indemnité par versements (DRAS 205.527) en vigueur depuis le 1er novembre 2025 pour les GPM critiques de la Liste J-1.',
      },
    },
  },
  en: {
    sectionTitle: 'Regulatory Terminology & Acronyms',
    regularForce: 'Regular Force',
    reserveForce: 'Primary Reserve',
    ncmLabel: 'Non-Commissioned Member (NCM)',
    officerLabel: 'Officer',
    coraEligible: 'CORA Eligible (List J-1)',
    coraNotListed: 'Not CORA Designated',
    discontinued: 'No longer offered',
    provisionalWarning: 'Provisional qualification (delta training / OJE required)',
    originalOfficialTextNote:
      'Regulatory excerpts below preserve the exact official wording from the MOL 26/27 V4 source tables.',
    terms: {
      MOSID: {
        code: 'MOSID',
        label: 'Military Occupation Structure Identification',
        definition: 'Unique 5-digit numerical code identifying each CAF occupation.',
      },
      MOQ: {
        code: 'MOQ',
        label: 'Military Occupation Qualified',
        definition: 'Skilled applicant previously trained in the same Regular or Reserve Force occupation.',
      },
      CTQ: {
        code: 'CTQ',
        label: 'Civilian Trade Qualified',
        definition: 'Semi-skilled applicant whose civilian training, experience, and/or certification (e.g., Red Seal) equates to most occupational training.',
      },
      'PSD/C': {
        code: 'PSD/C',
        label: 'Post-Secondary Diploma / Certificate',
        definition: 'Semi-skilled applicant holding an eligible diploma or certificate listed in List B or List G.',
      },
      TCP: {
        code: 'TCP',
        label: 'Time Credit for Promotion',
        definition: 'Credit in calendar days granted upon enrolment toward promotion to the next rank.',
      },
      PI: {
        code: 'PI',
        label: 'Pay Increment',
        definition: 'Initial pay level determined through PLAR or OA assessment (CBI 204.015 / 204.511).',
      },
      PLAR: {
        code: 'PLAR',
        label: 'Prior Learning Assessment and Recognition',
        definition: 'Formal Occupation Authority (OA) review required when an applicant’s program or experience is not pre-approved on Lists B or G.',
      },
      CORA: {
        code: 'CORA',
        label: 'Critical Occupation Recruitment Allowance',
        definition: 'Instalment-based allowance (CBI 205.527) effective 1 November 2025 for critical occupations listed on List J-1.',
      },
    },
  },
};
