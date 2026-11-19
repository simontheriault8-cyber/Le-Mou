import type { Language } from '../types/mol';
import { CORE_DICT, type CoreDictionary } from './core';
import { GLOSSARY_DICT, type GlossaryDictionary } from './glossary';
import { TABLES_DICT, type TablesDictionary } from './tables';
import { SIMULATOR_DICT, type SimulatorDictionary } from './simulator';

export interface AppDictionaries {
  core: CoreDictionary;
  glossary: GlossaryDictionary;
  tables: TablesDictionary;
  simulator: SimulatorDictionary;
}

export function getDictionaries(lang: Language): AppDictionaries {
  return {
    core: CORE_DICT[lang],
    glossary: GLOSSARY_DICT[lang],
    tables: TABLES_DICT[lang],
    simulator: SIMULATOR_DICT[lang],
  };
}
