import type { Language } from '../types/mol';

export interface CoreDictionary {
  brandTitle: string;
  versionTag: string;
  navDossier: string;
  navSimulator: string;
  navCompare: string;
  navPrograms: string;
  printSummary: string;
  languageSwitchLabel: string;
  forceSwitchLabel: string;
  forceRegShort: string;
  forceResShort: string;
  forceRegFull: string;
  forceResFull: string;
  searchPlaceholder: string;
  filterAll: string;
  filterNcm: string;
  filterOfficer: string;
  filterAllCommands: string;
  filterCoraOnly: string;
  occupationsCount: string;
  selectOccupationTitle: string;
  selectOccupationHint: string;
  noResultsTitle: string;
  noResultsHint: string;
  resetFilters: string;
  close: string;
  expandAllNotes: string;
  collapseAllNotes: string;
  viewSourceNote: string;
  loading: string;
  errorTitle: string;
  printGeneratedOn: string;
  printFooterNote: string;
  commandLabels: Record<string, string>;
}

export const CORE_DICT: Record<Language, CoreDictionary> = {
  fr: {
    brandTitle: 'PIESMR · LGPM 26/27',
    versionTag: 'LGPM 26/27 V4 · En vigueur le 11 septembre 2026',
    navDossier: 'Dossier',
    navSimulator: 'Simulateur',
    navCompare: 'Comparer',
    navPrograms: 'Programmes',
    printSummary: 'Imprimer la fiche',
    languageSwitchLabel: 'Langue',
    forceSwitchLabel: 'Composante des FAC',
    forceRegShort: 'Régulière',
    forceResShort: 'Réserve',
    forceRegFull: 'Force régulière',
    forceResFull: 'Première réserve',
    searchPlaceholder: 'Rechercher par ID SGPM (ex. 00299), GPM, titre ou plan...',
    filterAll: 'Tous',
    filterNcm: 'Militaires du rang',
    filterOfficer: 'Officiers',
    filterAllCommands: 'Tous les commandements',
    filterCoraOnly: 'IRGPC seulement',
    occupationsCount: 'métiers répertoriés',
    selectOccupationTitle: 'Sélectionnez un métier dans le répertoire',
    selectOccupationHint:
      'Choisissez un groupe professionnel militaire ou un plan de production d’officiers pour centraliser ses règles, programmes et notes de bas de page.',
    noResultsTitle: 'Aucun métier ne correspond aux filtres actuels',
    noResultsHint: 'Modifiez votre recherche ou réinitialisez les filtres de commandement et de catégorie.',
    resetFilters: 'Réinitialiser les filtres',
    close: 'Fermer',
    expandAllNotes: 'Tout déplier',
    collapseAllNotes: 'Tout replier',
    viewSourceNote: 'Consulter la note liée',
    loading: 'Chargement en cours...',
    errorTitle: 'Une erreur est survenue',
    printGeneratedOn: 'Fiche générée le',
    printFooterNote: 'Référence LGPM 26/27 V4 (4500-1 Gestionnaire des LGPM) — Usage interne de recrutement.',
    commandLabels: {
      RCN: 'MRC (Marine)',
      CA: 'AC (Armée)',
      RCAF: 'ARC (Aviation)',
      'CMP Health': 'CPM Services de santé',
      'CMP Support': 'CPM Soutien',
      CFINTCOM: 'COMRENSFC',
      CFPM: 'GPFC (Police militaire)',
      ALL: 'Toutes les armées',
    },
  },
  en: {
    brandTitle: 'NCMSTEP · MOL 26/27',
    versionTag: 'MOL 26/27 V4 · Valid starting 11 September 2026',
    navDossier: 'Dossier',
    navSimulator: 'Simulator',
    navCompare: 'Compare',
    navPrograms: 'Programs',
    printSummary: 'Print Summary',
    languageSwitchLabel: 'Language',
    forceSwitchLabel: 'CAF Component',
    forceRegShort: 'Regular',
    forceResShort: 'Reserve',
    forceRegFull: 'Regular Force',
    forceResFull: 'Primary Reserve',
    searchPlaceholder: 'Search by MOSID (e.g. 00299), OCC, title, or entry plan...',
    filterAll: 'All',
    filterNcm: 'NCMs',
    filterOfficer: 'Officers',
    filterAllCommands: 'All Commands',
    filterCoraOnly: 'CORA Only',
    occupationsCount: 'occupations indexed',
    selectOccupationTitle: 'Select an occupation from the directory',
    selectOccupationHint:
      'Choose a Military Occupation or Officer Production Plan to centralize all entry rules, accredited programs, and linked footnotes.',
    noResultsTitle: 'No occupations match the active filters',
    noResultsHint: 'Adjust your search query or reset the command and personnel filters.',
    resetFilters: 'Reset Filters',
    close: 'Close',
    expandAllNotes: 'Expand all',
    collapseAllNotes: 'Collapse all',
    viewSourceNote: 'View linked note',
    loading: 'Loading...',
    errorTitle: 'An error occurred',
    printGeneratedOn: 'Summary generated on',
    printFooterNote: 'Reference MOL 26/27 V4 (4500-1 MOL Manager) — Internal recruiting reference.',
    commandLabels: {
      RCN: 'RCN (Navy)',
      CA: 'CA (Army)',
      RCAF: 'RCAF (Air Force)',
      'CMP Health': 'CMP Health Services',
      'CMP Support': 'CMP Support',
      CFINTCOM: 'CFINTCOM',
      CFPM: 'CFPM (Military Police)',
      ALL: 'All Elements',
    },
  },
};
