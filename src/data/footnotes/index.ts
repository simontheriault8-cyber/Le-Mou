import type { FootnoteEntry } from '../../types/mol';
import { LIST_AF_FOOTNOTES } from './listAF';
import { LIST_CDE_FOOTNOTES } from './listCDE';
import { LIST_B_1_FOOTNOTES } from './listB_1';
import { LIST_B_2_FOOTNOTES } from './listB_2';
import { LIST_G_FOOTNOTES } from './listG';
import { LIST_HIJKL_FOOTNOTES } from './listHIJKL';

export const ALL_BASE_FOOTNOTES: FootnoteEntry[] = [
  ...LIST_AF_FOOTNOTES,
  ...LIST_CDE_FOOTNOTES,
  ...LIST_B_1_FOOTNOTES,
  ...LIST_B_2_FOOTNOTES,
  ...LIST_G_FOOTNOTES,
  ...LIST_HIJKL_FOOTNOTES,
];

export function buildFootnoteMap(): Record<string, FootnoteEntry> {
  const map: Record<string, FootnoteEntry> = {};
  for (const n of ALL_BASE_FOOTNOTES) {
    map[n.key] = n;
  }
  return map;
}

export function resolveFootnoteEntry(
  map: Record<string, FootnoteEntry>,
  key: string
): FootnoteEntry | undefined {
  if (map[key]) return map[key];
  // Check range keys like "B:app:25:note:3-10" or "G:app:10:note:2-9" when given "...:note:5"
  const m = key.match(/^(.+:note:)(\d+)$/);
  if (!m) return undefined;
  const [, prefix, numStr] = m;
  const targetNum = parseInt(numStr, 10);
  for (const candidateKey of Object.keys(map)) {
    if (!candidateKey.startsWith(prefix)) continue;
    const suffix = candidateKey.slice(prefix.length);
    const rangeMatch = suffix.match(/^(\d+)-(\d+)$/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      if (targetNum >= start && targetNum <= end) {
        return map[candidateKey];
      }
    }
  }
  return undefined;
}

const BASE_FOOTNOTE_MAP: Record<string, FootnoteEntry> = buildFootnoteMap();

export function resolveProgramNoteKeys(
  tableId: 'B' | 'G' | 'I',
  appendixOrOcc: string | undefined,
  noteRef: string
): string[] {
  if (!noteRef || noteRef === '-' || noteRef === 'N/A') return [];
  const keys: string[] = [];
  // Strip Transport Canada approval codes (e.g. TC# 2013-05-4175) and long numbers (hours, years, MITE codes)
  const sanitized = noteRef
    .replace(/TC\s*#?[\d\s-]+/gi, ' ')
    .replace(/\b\d{3,}\b/g, ' ');
  const lower = sanitized.toLowerCase();

  // Only treat digits as footnote numbers if the string mentions "note", "see", or is purely numbers/separators
  const looksLikeNoteRef =
    /\bnotes?\b|\bsee\b|^[\d\s,&.-]+$/i.test(lower.trim());
  const nums = looksLikeNoteRef
    ? Array.from(lower.matchAll(/\b([1-9]\d?)\b/g))
        .map((m) => String(parseInt(m[1], 10)))
        .filter((n) => parseInt(n, 10) <= 40)
    : [];

  if (tableId === 'B' || tableId === 'G') {
    const app = (appendixOrOcc || '').trim();
    if (!app) return keys;
    for (const num of nums) {
      const candidate = `${tableId}:app:${app}:note:${num}`;
      const match = resolveFootnoteEntry(BASE_FOOTNOTE_MAP, candidate);
      if (match) keys.push(match.key);
    }
    if ((lower.includes('see below') || lower.includes('applicable program notes')) && nums.length === 0) {
      const fallback = `${tableId}:app:${app}:note:1`;
      const match = resolveFootnoteEntry(BASE_FOOTNOTE_MAP, fallback);
      if (match) keys.push(match.key);
    }
  } else if (tableId === 'I') {
    const occ = (appendixOrOcc || '').trim();
    for (const num of nums) {
      const candidate = `I:${occ}:note:${num}`;
      const match = resolveFootnoteEntry(BASE_FOOTNOTE_MAP, candidate);
      if (match) keys.push(match.key);
    }
    if (lower.includes('see notes') && nums.length === 0) {
      const fallback = `I:${occ}:note:1`;
      const match = resolveFootnoteEntry(BASE_FOOTNOTE_MAP, fallback);
      if (match) keys.push(match.key);
    }
  }

  return Array.from(new Set(keys));
}
