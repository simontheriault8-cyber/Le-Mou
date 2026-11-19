import React, { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight, Globe2, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMolData } from '../context/DataContext';
import { resolveAndGroupFootnotes } from '../utils/footnoteResolver';
import { FootnoteBadge } from './FootnoteBadge';
import { FootnotePanel } from './FootnotePanel';

const PAGE_SIZE = 30;

interface ProgramExplorerProps {
  activeForce: 'reg' | 'res';
}

export const ProgramExplorer: React.FC<ProgramExplorerProps> = ({ activeForce }) => {
  const { dict } = useLanguage();
  const { datasets } = useMolData();
  const pv = dict.tables.programsView;
  const c = dict.tables.columns;

  const [query, setQuery] = useState('');
  const [tableFilter, setTableFilter] = useState<'ALL' | 'B' | 'I'>('ALL');
  const [provinceFilter, setProvinceFilter] = useState<string>('ALL');
  const [sectorFilter, setSectorFilter] = useState<'all' | 'public' | 'private'>('all');
  const [page, setPage] = useState(1);
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  const allPrograms = useMemo(
    () =>
      activeForce === 'reg'
        ? [...datasets.listB, ...datasets.listI]
        : [...datasets.listG],
    [datasets.listB, datasets.listG, datasets.listI, activeForce]
  );

  const provinces = useMemo(() => {
    const set = new Set<string>();
    for (const p of allPrograms) {
      const prov = p.province.trim();
      if (prov && prov.length <= 20) set.add(prov);
    }
    return Array.from(set).sort();
  }, [allPrograms]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allPrograms.filter((p) => {
      if (activeForce === 'reg' && tableFilter !== 'ALL' && p.tableId !== tableFilter) return false;
      if (provinceFilter !== 'ALL' && p.province.trim() !== provinceFilter) return false;
      if (sectorFilter !== 'all') {
        const sec = (p.publicPrivate ?? '').toLowerCase();
        if (sectorFilter === 'public' && !sec.includes('public')) return false;
        if (
          sectorFilter === 'private' &&
          !sec.includes('priv')
        ) {
          return false;
        }
      }
      if (!q) return true;
      return (
        p.program.toLowerCase().includes(q) ||
        p.institution.toLowerCase().includes(q) ||
        p.mosid.toLowerCase().includes(q) ||
        p.occupation.toLowerCase().includes(q) ||
        (p.location ?? '').toLowerCase().includes(q)
      );
    });
  }, [allPrograms, tableFilter, provinceFilter, sectorFilter, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);

  const pagedRows = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, safePage]);

  const visibleNoteGroups = useMemo(() => {
    const keys: string[] = [];
    for (const r of pagedRows) {
      keys.push(...r.resolvedNoteKeys);
    }
    if (highlightedKey) keys.push(highlightedKey);
    return resolveAndGroupFootnotes(keys, datasets.footnoteMap, [], activeForce);
  }, [pagedRows, highlightedKey, datasets.footnoteMap, activeForce]);

  const handleFilterChange = (setter: () => void) => {
    setter();
    setPage(1);
  };

  const handleSelectNote = (key: string) => {
    setHighlightedKey(key);
    setTimeout(() => {
      const target =
        document.getElementById(`footnote-${key}`) ??
        document.getElementById('footnotes-register');
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  return (
    <div className="space-y-6">
      <section className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex items-center gap-2.5 text-[#1e3a5f]">
          <Globe2 className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900">{pv.title}</h2>
        </div>
        <p className="text-xs text-slate-600 mt-1">{pv.subtitle}</p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => handleFilterChange(() => setQuery(e.target.value))}
              placeholder={pv.searchPlaceholder}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            />
          </div>

          {activeForce === 'reg' ? (
            <select
              value={tableFilter}
              onChange={(e) =>
                handleFilterChange(() =>
                  setTableFilter(e.target.value as 'ALL' | 'B' | 'I')
                )
              }
              className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            >
              <option value="ALL">{pv.regTablesOption}</option>
              <option value="B">
                {dict.tables.tables.B.shortTitle} — {dict.tables.tables.B.force}
              </option>
              <option value="I">
                {dict.tables.tables.I.shortTitle} — {dict.tables.tables.I.force}
              </option>
            </select>
          ) : (
            <div className="px-3 py-2 text-xs font-semibold bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-md flex items-center">
              {pv.resTableBanner}
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <select
              value={provinceFilter}
              onChange={(e) => handleFilterChange(() => setProvinceFilter(e.target.value))}
              className="px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            >
              <option value="ALL">{pv.allProvinces}</option>
              {provinces.map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>

            <select
              value={sectorFilter}
              onChange={(e) =>
                handleFilterChange(() =>
                  setSectorFilter(e.target.value as 'all' | 'public' | 'private')
                )
              }
              className="px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            >
              <option value="all">{pv.allSector}</option>
              <option value="public">{pv.publicOnly}</option>
              <option value="private">{pv.privateOnly}</option>
            </select>
          </div>
        </div>
      </section>

      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-slate-700 tabular-nums">
            {filtered.length} {pv.showingCount}
          </span>
          <div className="flex items-center gap-2 tabular-nums">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-slate-300 bg-white rounded text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              {pv.previousPage}
            </button>
            <span className="text-slate-600 px-1">
              {safePage} / {totalPages}
            </span>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 px-2.5 py-1 border border-slate-300 bg-white rounded text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer disabled:cursor-default"
            >
              {pv.nextPage}
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                <th className="py-2.5 px-2.5 lg:w-[7%]">{c.row}</th>
                <th className="py-2.5 px-2.5 lg:w-[7%]">{c.mosid}</th>
                <th className="py-2.5 px-2.5 lg:w-[10%]">{c.occupation}</th>
                <th className="py-2.5 px-2.5 lg:w-[24%]">{c.program}</th>
                <th className="py-2.5 px-2.5 lg:w-[22%]">{c.institution}</th>
                <th className="py-2.5 px-2.5 lg:w-[9%]">{c.length}</th>
                <th className="py-2.5 px-2.5 lg:w-[6%]">{c.province}</th>
                <th className="py-2.5 px-2.5 lg:w-[15%]">{c.notes}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pagedRows.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/70 align-top">
                  <td className="py-2.5 px-2.5 tabular-nums break-words">
                    <span className="font-semibold text-[#1e3a5f]">{row.tableId}</span>
                    <span className="text-slate-400"> · {row.rowNumber}</span>
                  </td>
                  <td className="py-2.5 px-2.5 font-medium text-slate-800 tabular-nums break-words">
                    {row.mosid}
                  </td>
                  <td className="py-2.5 px-2.5 font-semibold text-slate-900 break-words">
                    {row.occupation}
                  </td>
                  <td className="py-2.5 px-2.5 font-medium text-slate-900 break-words">
                    {row.program}
                  </td>
                  <td className="py-2.5 px-2.5 text-slate-700 break-words">
                    <div>{row.institution}</div>
                    {row.location && (
                      <div className="text-[11px] text-slate-500 mt-0.5">{row.location}</div>
                    )}
                  </td>
                  <td className="py-2.5 px-2.5 text-slate-700 tabular-nums break-words">
                    {row.length || '—'}
                  </td>
                  <td className="py-2.5 px-2.5 font-medium text-slate-800 break-words">
                    {row.province || '—'}
                  </td>
                  <td className="py-2.5 px-2.5">
                    <div className="flex flex-wrap gap-1">
                      {row.resolvedNoteKeys.length > 0 ? (
                        row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={datasets.footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))
                      ) : (
                        <span className="text-slate-400 break-words">{row.noteRef || '—'}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <FootnotePanel
        groupedFootnotes={visibleNoteGroups}
        highlightedKey={highlightedKey}
        onClearHighlight={() => setHighlightedKey(null)}
      />
    </div>
  );
};
