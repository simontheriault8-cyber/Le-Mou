import type { ProgramEntry } from '../../types/mol';
import { LIST_G_SHARD_1 } from './listG_1';
import { LIST_G_SHARD_2 } from './listG_2';
import { LIST_G_SHARD_3 } from './listG_3';
import { LIST_G_SHARD_4 } from './listG_4';

export const LIST_G_ENTRIES: ProgramEntry[] = [
  ...LIST_G_SHARD_1,
  ...LIST_G_SHARD_2,
  ...LIST_G_SHARD_3,
  ...LIST_G_SHARD_4,
];
