import type { FootnoteEntry, TableId } from '../types/mol';
import { resolveFootnoteEntry } from '../data/footnotes';

export interface GroupedFootnotes {
  tableId: TableId;
  notes: FootnoteEntry[];
}

const TABLE_ORDER: TableId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J-1', 'K', 'L'];

const REG_TABLES = new Set<TableId>(['A', 'B', 'C', 'D', 'H', 'I', 'J-1', 'K', 'L']);
const RES_TABLES = new Set<TableId>(['E', 'F', 'G', 'K', 'L']);

/**
 * Given a set of footnote keys (from rows, career profiles, or occupation-level scopes),
 * resolve exact FootnoteEntry records (supporting numeric ranges like 3-10) and group by TableId.
 */
export function resolveAndGroupFootnotes(
  keys: string[],
  footnoteMap: Record<string, FootnoteEntry>,
  extraOccupationCodes: string[] = [],
  force?: 'reg' | 'res'
): GroupedFootnotes[] {
  const allowedTables = force === 'reg' ? REG_TABLES : force === 'res' ? RES_TABLES : null;
  const seenKeys = new Set<string>();
  const collected: FootnoteEntry[] = [];

  for (const rawKey of keys) {
    const entry = resolveFootnoteEntry(footnoteMap, rawKey);
    if (entry && (!allowedTables || allowedTables.has(entry.tableId)) && !seenKeys.has(entry.key)) {
      seenKeys.add(entry.key);
      collected.push(entry);
    }
  }

  // Also include general table notes or occupation-wide notes whose key wasn't explicitly listed on a row
  if (extraOccupationCodes.length > 0) {
    const upperCodes = new Set(extraOccupationCodes.map((c) => c.trim().toUpperCase()));
    for (const entry of Object.values(footnoteMap)) {
      if (allowedTables && !allowedTables.has(entry.tableId)) continue;
      if (seenKeys.has(entry.key)) continue;
      if (entry.occupationCode) {
        const occTokens = entry.occupationCode.toUpperCase().split(/[\/,]/).map((s) => s.trim());
        if (occTokens.some((tok) => upperCodes.has(tok))) {
          seenKeys.add(entry.key);
          collected.push(entry);
        }
      }
    }
  }

  const byTable = new Map<TableId, FootnoteEntry[]>();
  for (const entry of collected) {
    const bucket = byTable.get(entry.tableId) ?? [];
    bucket.push(entry);
    byTable.set(entry.tableId, bucket);
  }

  return TABLE_ORDER.filter((id) => byTable.has(id)).map((id) => {
    const list = byTable.get(id)!;
    list.sort((a, b) => {
      if (a.scope !== b.scope) {
        const order = { general: 0, note: 1, reference: 2, appendix: 3, occupation: 4 };
        return order[a.scope] - order[b.scope];
      }
      const appDiff = (a.appendix ?? '').localeCompare(b.appendix ?? '', undefined, { numeric: true });
      if (appDiff !== 0) return appDiff;
      return a.noteNumber.localeCompare(b.noteNumber, undefined, { numeric: true });
    });
    return { tableId: id, notes: list };
  });
}

/**
 * Formats a concise human-readable badge label for a footnote key.
 * E.g. "A:general:1" -> "Note générale" / "General Note", "B:app:29:note:1" -> "App.29·1"
 */
export function formatFootnoteBadgeLabel(
  entryOrKey: FootnoteEntry | string,
  language: 'fr' | 'en' = 'fr'
): string {
  if (typeof entryOrKey !== 'string') {
    const n = entryOrKey;
    if (n.scope === 'general') {
      const trimmed = n.noteNumber.trim();
      if (/^\d+$/.test(trimmed)) return `G${trimmed}`;
      return language === 'fr' ? 'Note générale' : 'General Note';
    }
    if (n.scope === 'appendix' && n.appendix) return `App.${n.appendix}·${n.noteNumber}`;
    if (n.scope === 'reference') return n.noteNumber;
    return `Note ${n.noteNumber}`;
  }
  const parts = entryOrKey.split(':');
  if (parts[1] === 'general') {
    if (parts[2] === '1') return language === 'fr' ? 'Note générale' : 'General Note';
    return `G${parts[2] ?? ''}`;
  }
  if (parts[1] === 'app') return `App.${parts[2] ?? ''}·${parts[4] ?? ''}`;
  if (parts[1] === 'ref') return `Ref ${parts[2] ?? ''}`;
  if (parts[1] === 'note') return `Note ${parts[2] ?? ''}`;
  return entryOrKey;
}
