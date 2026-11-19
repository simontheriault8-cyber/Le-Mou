import React, { useMemo } from 'react';
import { Search, RotateCcw } from 'lucide-react';
import type { OccupationMaster, PersonnelType } from '../types/mol';
import { useLanguage } from '../context/LanguageContext';

interface OccupationSidebarProps {
  occupations: OccupationMaster[];
  activeForce: 'reg' | 'res';
  selectedId: string;
  onSelect: (id: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  personnelFilter: 'all' | PersonnelType;
  onPersonnelFilterChange: (f: 'all' | PersonnelType) => void;
  commandFilter: string;
  onCommandFilterChange: (cmd: string) => void;
  coraOnly: boolean;
  onCoraOnlyChange: (val: boolean) => void;
}

const COMMAND_OPTIONS = ['ALL', 'RCN', 'CA', 'RCAF', 'CMP Health', 'CMP Support', 'CFINTCOM', 'CFPM'];

export const OccupationSidebar: React.FC<OccupationSidebarProps> = ({
  occupations,
  activeForce,
  selectedId,
  onSelect,
  searchQuery,
  onSearchChange,
  personnelFilter,
  onPersonnelFilterChange,
  commandFilter,
  onCommandFilterChange,
  coraOnly,
  onCoraOnlyChange,
}) => {
  const { language, dict } = useLanguage();

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return occupations
      .filter((occ) => {
        if (personnelFilter !== 'all' && occ.personnelType !== personnelFilter) return false;
        if (commandFilter !== 'ALL' && !occ.command.toUpperCase().includes(commandFilter.toUpperCase())) {
          return false;
        }
        if (activeForce === 'reg' && coraOnly && !occ.coraEligible) return false;
        if (!q) return true;
        return (
          occ.mosid.toLowerCase().includes(q) ||
          occ.acronym.toLowerCase().includes(q) ||
          occ.titleFr.toLowerCase().includes(q) ||
          occ.titleEn.toLowerCase().includes(q) ||
          occ.command.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const numA = /^\d+$/.test(a.mosid.trim()) ? parseInt(a.mosid.trim(), 10) : Number.MAX_SAFE_INTEGER;
        const numB = /^\d+$/.test(b.mosid.trim()) ? parseInt(b.mosid.trim(), 10) : Number.MAX_SAFE_INTEGER;
        if (numA !== numB) return numA - numB;
        return a.mosid.localeCompare(b.mosid, undefined, { numeric: true });
      });
  }, [occupations, activeForce, searchQuery, personnelFilter, commandFilter, coraOnly]);

  const handleReset = () => {
    onSearchChange('');
    onPersonnelFilterChange('all');
    onCommandFilterChange('ALL');
    onCoraOnlyChange(false);
  };

  return (
    <aside className="w-full lg:w-[272px] shrink-0 bg-white border border-slate-200 rounded-lg flex flex-col overflow-hidden lg:h-[calc(100vh-140px)] lg:sticky lg:top-4 print:hidden">
      <div className="p-3.5 border-b border-slate-200 space-y-2.5 bg-slate-50/70">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={dict.core.searchPlaceholder}
            className="w-full pl-8 pr-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]"
          />
        </div>

        <div className="grid grid-cols-3 gap-1 bg-slate-200/70 p-0.5 rounded-md">
          {(['all', 'ncm', 'officer'] as const).map((tab) => {
            const label =
              tab === 'all'
                ? dict.core.filterAll
                : tab === 'ncm'
                ? dict.core.filterNcm
                : dict.core.filterOfficer;
            const active = personnelFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => onPersonnelFilterChange(tab)}
                className={`px-1.5 py-1 text-[11px] font-medium rounded truncate cursor-pointer transition-colors ${
                  active ? 'bg-white text-[#1e3a5f] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={commandFilter}
            onChange={(e) => onCommandFilterChange(e.target.value)}
            aria-label={dict.core.filterAllCommands}
            className="flex-1 min-w-0 px-2 py-1 text-xs bg-white border border-slate-300 rounded-md text-slate-700 focus:outline-none focus:border-[#1e3a5f]"
          >
            {COMMAND_OPTIONS.map((cmd) => (
              <option key={cmd} value={cmd}>
                {cmd === 'ALL'
                  ? dict.core.filterAllCommands
                  : dict.core.commandLabels[cmd] ?? cmd}
              </option>
            ))}
          </select>

          {activeForce === 'reg' && (
            <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-700 cursor-pointer shrink-0 select-none">
              <input
                type="checkbox"
                checked={coraOnly}
                onChange={(e) => onCoraOnlyChange(e.target.checked)}
                className="rounded border-slate-300 text-[#1e3a5f] focus:ring-[#1e3a5f]"
              />
              <span>{dict.core.filterCoraOnly}</span>
            </label>
          )}
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
          <span className="tabular-nums">
            {filtered.length} {dict.core.occupationsCount}
          </span>
          {(searchQuery || personnelFilter !== 'all' || commandFilter !== 'ALL' || (activeForce === 'reg' && coraOnly)) && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[#1e3a5f] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              {dict.core.resetFilters}
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
        {filtered.length === 0 ? (
          <div className="p-5 text-center space-y-2">
            <p className="text-xs font-semibold text-slate-700">{dict.core.noResultsTitle}</p>
            <p className="text-[11px] text-slate-500">{dict.core.noResultsHint}</p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-2 px-3 py-1 rounded text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
            >
              {dict.core.resetFilters}
            </button>
          </div>
        ) : (
          filtered.map((occ) => {
            const isSelected = occ.id === selectedId;
            const title = language === 'fr' ? occ.titleFr : occ.titleEn;
            return (
              <button
                key={occ.id}
                type="button"
                onClick={() => onSelect(occ.id)}
                className={`w-full text-left px-3.5 py-2.5 transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-sky-50/90 border-r-2 border-r-[#1e3a5f]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      isSelected ? 'text-[#1e3a5f]' : 'text-slate-900'
                    }`}
                  >
                    {occ.mosid} · {occ.acronym}
                  </span>
                  <span className="text-[10px] font-medium text-slate-500 shrink-0">
                    {occ.command}
                  </span>
                </div>
                <p className="text-xs text-slate-600 line-clamp-1 mt-0.5">{title}</p>
                {activeForce === 'reg' && occ.coraEligible && (
                  <p className="text-[10px] font-semibold text-emerald-700 mt-0.5">
                    {dict.glossary.coraEligible}
                  </p>
                )}
              </button>
            );
          })
        )}
      </div>
    </aside>
  );
};
