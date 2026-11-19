import type { NcmPayEntry } from '../../types/mol';
import { LIST_A_PART1_ENTRIES } from './listA_1';
import { LIST_A_PART2_ENTRIES } from './listA_2';

export const LIST_A_ENTRIES: NcmPayEntry[] = [
  ...LIST_A_PART1_ENTRIES,
  ...LIST_A_PART2_ENTRIES,
];
