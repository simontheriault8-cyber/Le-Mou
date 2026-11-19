import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  Award,
  Building2,
  Calendar,
  ChevronDown,
  ChevronUp,
  FileText,
  GraduationCap,
  Shield,
  Users,
} from 'lucide-react';
import type { FootnoteEntry, ProgramEntry, TableId } from '../types/mol';
import type { OccupationDossierData } from '../utils/occupationAggregator';
import { useLanguage } from '../context/LanguageContext';
import { FootnoteBadge } from './FootnoteBadge';
import { FootnotePanel } from './FootnotePanel';

interface OccupationDossierProps {
  dossier: OccupationDossierData;
  activeForce: 'reg' | 'res';
  footnoteMap: Record<string, FootnoteEntry>;
}

interface ProgramSectionProps {
  title: string;
  tableId: TableId;
  programs: ProgramEntry[];
  footnoteMap: Record<string, FootnoteEntry>;
  onSelectNote: (key: string) => void;
}

const ProgramTableSection: React.FC<ProgramSectionProps> = ({
  title,
  tableId,
  programs,
  footnoteMap,
  onSelectNote,
}) => {
  const { dict } = useLanguage();
  const [expanded, setExpanded] = useState(programs.length <= 20);
  const [provinceFilter, setProvinceFilter] = useState<string>('ALL');
  const [query, setQuery] = useState('');

  const provinces = useMemo(() => {
    const set = new Set<string>();
    for (const p of programs) {
      if (p.province.trim()) set.add(p.province.trim());
    }
    return Array.from(set).sort();
  }, [programs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return programs.filter((p) => {
      if (provinceFilter !== 'ALL' && p.province.trim() !== provinceFilter) return false;
      if (!q) return true;
      return (
        p.program.toLowerCase().includes(q) ||
        p.institution.toLowerCase().includes(q) ||
        (p.location ?? '').toLowerCase().includes(q)
      );
    });
  }, [programs, provinceFilter, query]);

  const visibleRows = expanded ? filtered : filtered.slice(0, 15);
  const c = dict.tables.columns;

  return (
    <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <GraduationCap className="w-4 h-4 text-[#1e3a5f] shrink-0" />
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <span className="text-xs text-slate-500 tabular-nums">
            · {filtered.length}
            {filtered.length !== programs.length ? ` / ${programs.length}` : ''}
          </span>
        </div>

        {programs.length > 8 && (
          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={dict.tables.programsView.searchPlaceholder}
              className="w-56 px-2.5 py-1 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1e3a5f]"
            />
            {provinces.length > 1 && (
              <select
                value={provinceFilter}
                onChange={(e) => setProvinceFilter(e.target.value)}
                className="px-2 py-1 text-xs bg-white border border-slate-300 rounded focus:outline-none focus:border-[#1e3a5f]"
              >
                <option value="ALL">{dict.tables.programsView.allProvinces}</option>
                {provinces.map((prov) => (
                  <option key={prov} value={prov}>
                    {prov}
                  </option>
                ))}
              </select>
            )}
          </div>
        )}
      </div>

      <div className="overflow-x-auto lg:overflow-x-visible">
        <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
              <th className="py-2.5 px-2.5 lg:w-[4%] tabular-nums">{c.row}</th>
              <th className={`py-2.5 px-2.5 ${tableId === 'I' ? 'lg:w-[25%]' : 'lg:w-[22%]'}`}>
                {c.program}
              </th>
              <th className={`py-2.5 px-2.5 ${tableId === 'I' ? 'lg:w-[24%]' : 'lg:w-[22%]'}`}>
                {c.institution}
              </th>
              {tableId !== 'I' && (
                <th className="py-2.5 px-2.5 lg:w-[8%]">{c.meetsMajority}</th>
              )}
              <th className={`py-2.5 px-2.5 ${tableId === 'I' ? 'lg:w-[10%]' : 'lg:w-[9%]'}`}>
                {c.length}
              </th>
              <th className="py-2.5 px-2.5 lg:w-[6%]">{c.province}</th>
              {tableId === 'I' && <th className="py-2.5 px-2.5 lg:w-[16%]">{c.location}</th>}
              {tableId !== 'I' && (
                <th className="py-2.5 px-2.5 lg:w-[15%]">{c.accreditation}</th>
              )}
              <th className="py-2.5 px-2.5 lg:w-[14%]">{c.notes}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {visibleRows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70 align-top">
                <td className="py-2.5 px-2.5 text-slate-500 tabular-nums">{row.rowNumber}</td>
                <td className="py-2.5 px-2.5 font-medium text-slate-900 break-words">
                  {row.program}
                </td>
                <td className="py-2.5 px-2.5 text-slate-700 break-words">
                  <div>{row.institution}</div>
                  {tableId !== 'I' && row.location && (
                    <div className="text-[11px] text-slate-500 mt-0.5">{row.location}</div>
                  )}
                </td>
                {tableId !== 'I' && (
                  <td className="py-2.5 px-2.5 text-slate-700 break-words">
                    {row.meetsMajority || '—'}
                  </td>
                )}
                <td className="py-2.5 px-2.5 text-slate-700 tabular-nums break-words">
                  {row.length || '—'}
                </td>
                <td className="py-2.5 px-2.5 text-slate-700 font-medium break-words">
                  {row.province || '—'}
                </td>
                {tableId === 'I' && (
                  <td className="py-2.5 px-2.5 text-slate-600 break-words">
                    {row.location || '—'}
                  </td>
                )}
                {tableId !== 'I' && (
                  <td className="py-2.5 px-2.5 text-slate-600 break-words">
                    {row.accreditationType || row.publicPrivate || '—'}
                  </td>
                )}
                <td className="py-2.5 px-2.5">
                  <div className="flex flex-wrap gap-1 items-center">
                    {row.resolvedNoteKeys.length > 0 ? (
                      row.resolvedNoteKeys.map((k) => (
                        <FootnoteBadge
                          key={k}
                          noteKey={k}
                          entry={footnoteMap[k]}
                          onSelect={onSelectNote}
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

      {filtered.length > 15 && (
        <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex justify-center print:hidden">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1e3a5f] hover:underline cursor-pointer"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                {dict.core.collapseAllNotes}
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                {`${dict.core.expandAllNotes} (${filtered.length})`}
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export const OccupationDossier: React.FC<OccupationDossierProps> = ({
  dossier,
  activeForce,
  footnoteMap,
}) => {
  const { language, dict } = useLanguage();
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  const occ = dossier.occupation;
  const primaryTitle = language === 'fr' ? occ.titleFr : occ.titleEn;
  const secondaryTitle = language === 'fr' ? occ.titleEn : occ.titleFr;
  const c = dict.tables.columns;
  const sh = dict.tables.sectionHeaders;
  const forceLabel = activeForce === 'reg' ? dict.core.forceRegFull : dict.core.forceResFull;

  const handleSelectNote = (key: string) => {
    setHighlightedKey(key);
    setTimeout(() => {
      const target =
        document.getElementById(`footnote-${key}`) ??
        document.getElementById('footnotes-register');
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 60);
  };

  const regProgramsTotal = dossier.regPrograms.length + dossier.ncmstepPrograms.length;

  const regPathwaysCount =
    occ.personnelType === 'ncm'
      ? dossier.regPayRows.length
      : dossier.officerRegRows.length;

  const resPathwaysCount =
    occ.personnelType === 'ncm'
      ? dossier.resPayRows.length
      : dossier.officerResRows.length;

  const kpiSecondLabel =
    activeForce === 'reg'
      ? occ.personnelType === 'ncm'
        ? dict.tables.tables.H.shortTitle
        : dict.tables.tables.D.shortTitle
      : dict.tables.tables.G.shortTitle;

  const kpiSecondCount =
    activeForce === 'reg'
      ? occ.personnelType === 'ncm'
        ? dossier.careerProfiles.reduce((sum, cp) => sum + cp.steps.length, 0)
        : dossier.officerAllowanceRows.length
      : dossier.resPrograms.length;

  return (
    <div className="space-y-6">
      {/* Print-only institutional header */}
      <div className="hidden print:block border-b-2 border-[#1e3a5f] pb-3 mb-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1e3a5f]">
            {dict.core.brandTitle} · {forceLabel}
          </span>
          <span className="text-[11px] text-slate-600 tabular-nums">
            {dict.core.printGeneratedOn} {new Date().toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA')}
          </span>
        </div>
        <p className="text-[11px] text-slate-600 mt-0.5">{dict.core.versionTag}</p>
      </div>

      {/* Occupation Header & KPI Strip */}
      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1e3a5f] tabular-nums">
                {occ.mosid} · {occ.acronym} · {dict.core.commandLabels[occ.command] || occ.command}
                {' · '}
                {occ.personnelType === 'ncm' ? dict.core.filterNcm : dict.core.filterOfficer}
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1 tracking-tight">
                {primaryTitle}
              </h2>
              {secondaryTitle && secondaryTitle !== primaryTitle && (
                <p className="text-xs text-slate-500 mt-0.5">{secondaryTitle}</p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <span
                className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                  activeForce === 'reg'
                    ? 'bg-sky-50 border-sky-200 text-[#1e3a5f]'
                    : 'bg-emerald-50 border-emerald-300 text-emerald-900'
                }`}
              >
                {forceLabel}
              </span>
              {activeForce === 'reg' && occ.coraEligible && (
                <div className="px-3 py-1.5 bg-amber-50 border border-amber-300 rounded text-xs font-semibold text-amber-900">
                  {language === 'fr' ? 'Admissible IRGPC (Liste J-1)' : 'CORA Eligible (List J-1)'}
                </div>
              )}
            </div>
          </div>

          {(occ.standUpNote || occ.isDiscontinued) && (
            <div className="mt-4 px-3.5 py-2.5 bg-amber-50/80 border border-amber-300 rounded-md flex items-start gap-2.5 text-xs text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>{occ.standUpNote}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 bg-slate-50/40">
          <div className="px-5 py-3">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {activeForce === 'reg'
                ? dict.tables.tables[occ.personnelType === 'ncm' ? 'A' : 'C'].shortTitle
                : dict.tables.tables[occ.personnelType === 'ncm' ? 'F' : 'E'].shortTitle}
            </div>
            <div className="text-lg font-bold text-slate-900 tabular-nums mt-0.5">
              {activeForce === 'reg' ? regPathwaysCount : resPathwaysCount}
            </div>
          </div>
          <div className="px-5 py-3">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {kpiSecondLabel}
            </div>
            <div className="text-lg font-bold text-slate-900 tabular-nums mt-0.5">
              {kpiSecondCount}
            </div>
          </div>
          <div className="px-5 py-3">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {activeForce === 'reg'
                ? language === 'fr'
                  ? 'Programmes (B · I)'
                  : 'Programs (B · I)'
                : language === 'fr'
                ? 'Incitatifs & congés (K · L)'
                : 'Incentives & Leave (K · L)'}
            </div>
            <div className="text-lg font-bold text-slate-900 tabular-nums mt-0.5">
              {activeForce === 'reg'
                ? regProgramsTotal
                : dossier.nonOccIncentives.length + dossier.leaveCredits.length}
            </div>
          </div>
          <div className="px-5 py-3">
            <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
              {sh.footnotesRegister}
            </div>
            <div className="text-lg font-bold text-[#1e3a5f] tabular-nums mt-0.5">
              {dossier.totalLinkedNotes}
            </div>
          </div>
        </div>
      </section>

      {/* List A — Regular Force NCM Pay & Incentives */}
      {dossier.regPayRows.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#1e3a5f] shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900">{sh.regForcePay}</h3>
              <span className="text-xs text-slate-500 tabular-nums">
                · {dict.tables.tables.A.shortTitle}
              </span>
            </div>
            <div className="flex flex-wrap gap-1">
              {['A:general:1', 'A:note:1', 'A:note:2', 'A:note:3'].map((k) => (
                <FootnoteBadge
                  key={k}
                  noteKey={k}
                  entry={footnoteMap[k]}
                  onSelect={handleSelectNote}
                  variant="compact"
                />
              ))}
            </div>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[4%] tabular-nums">{c.row}</th>
                  <th className="py-2.5 px-2.5 lg:w-[8%]">{c.category}</th>
                  <th className="py-2.5 px-2.5 lg:w-[20%]">{c.qualifications}</th>
                  <th className="py-2.5 px-2.5 lg:w-[10%]">{c.rank}</th>
                  <th className="py-2.5 px-2.5 lg:w-[9%]">{c.payIncrement}</th>
                  <th className="py-2.5 px-2.5 lg:w-[9%]">{c.tcp}</th>
                  <th className="py-2.5 px-2.5 lg:w-[20%]">{c.bypassed}</th>
                  <th className="py-2.5 px-2.5 lg:w-[11%]">{c.allowance}</th>
                  <th className="py-2.5 px-2.5 lg:w-[9%]">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossier.regPayRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 text-slate-500 tabular-nums">{row.rowNumber}</td>
                    <td className="py-2.5 px-2.5 font-semibold text-slate-900 break-words">
                      {row.category}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">
                      {row.specificQualifications || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 break-words">
                      {row.rank || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 tabular-nums break-words">
                      {row.payIncrement || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 tabular-nums break-words">
                      {row.tcp || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">
                      {row.bypassedOrAwarded || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 font-medium text-[#1e3a5f] tabular-nums break-words">
                      {row.recruitmentAllowance || '—'}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex flex-wrap gap-1">
                        {row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* List B — Regular Force Accredited Programs */}
      {dossier.regPrograms.length > 0 && (
        <ProgramTableSection
          title={sh.programsReg}
          tableId="B"
          programs={dossier.regPrograms}
          footnoteMap={footnoteMap}
          onSelectNote={handleSelectNote}
        />
      )}

      {/* List C — Regular Force Officer Pay */}
      {dossier.officerRegRows.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#1e3a5f] shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900">{sh.regForcePay}</h3>
            <span className="text-xs text-slate-500">· {dict.tables.tables.C.shortTitle}</span>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[4%] tabular-nums">{c.row}</th>
                  <th className="py-2.5 px-2.5 lg:w-[14%]">{c.productionPlan}</th>
                  <th className="py-2.5 px-2.5 lg:w-[20%]">{c.applicableTo}</th>
                  <th className="py-2.5 px-2.5 lg:w-[38%]">{c.conditions}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.payIncrement}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossier.officerRegRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 text-slate-500 tabular-nums">{row.rowNumber}</td>
                    <td className="py-2.5 px-2.5 font-semibold text-slate-900 break-words">
                      {row.productionPlan}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">{row.applicableTo}</td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">{row.conditions}</td>
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 tabular-nums break-words">
                      {row.payIncrement}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex flex-wrap gap-1">
                        {row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* List D — Officer Recruitment Allowance */}
      {dossier.officerAllowanceRows.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
            <Award className="w-4 h-4 text-[#1e3a5f] shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900">{sh.officerAllowance}</h3>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[4%] tabular-nums">{c.row}</th>
                  <th className="py-2.5 px-2.5 lg:w-[16%]">{c.occupation}</th>
                  <th className="py-2.5 px-2.5 lg:w-[28%]">{c.qualifications}</th>
                  <th className="py-2.5 px-2.5 lg:w-[10%]">{c.minService}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.allowance}</th>
                  <th className="py-2.5 px-2.5 lg:w-[18%]">{c.paymentMethod}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossier.officerAllowanceRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 text-slate-500 tabular-nums">{row.rowNumber}</td>
                    <td className="py-2.5 px-2.5 font-semibold text-slate-900 break-words">
                      {row.occupationLabel}
                      {row.effectiveDate && (
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                          {row.effectiveDate}
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">
                      {row.qualificationsRequired}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 tabular-nums break-words">
                      {row.minimumServicePeriod}
                    </td>
                    <td className="py-2.5 px-2.5 font-semibold text-[#1e3a5f] tabular-nums break-words">
                      {row.allowanceAmount}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">
                      <div>{row.paymentMethod}</div>
                      {row.paymentDate && (
                        <div className="text-[11px] text-slate-500 mt-0.5">{row.paymentDate}</div>
                      )}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex flex-wrap gap-1">
                        {row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* List E — Reserve Force Officer Pay */}
      {dossier.officerResRows.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[#1e3a5f] shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900">{sh.resForcePay}</h3>
            <span className="text-xs text-slate-500">· {dict.tables.tables.E.shortTitle}</span>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[4%] tabular-nums">{c.row}</th>
                  <th className="py-2.5 px-2.5 lg:w-[14%]">{c.productionPlan}</th>
                  <th className="py-2.5 px-2.5 lg:w-[20%]">{c.applicableTo}</th>
                  <th className="py-2.5 px-2.5 lg:w-[38%]">{c.conditions}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.payIncrement}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossier.officerResRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 text-slate-500 tabular-nums">{row.rowNumber}</td>
                    <td className="py-2.5 px-2.5 font-semibold text-slate-900 break-words">
                      {row.productionPlan}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">{row.applicableTo}</td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">{row.conditions}</td>
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 tabular-nums break-words">
                      {row.payIncrement}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex flex-wrap gap-1">
                        {row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* List F — Reserve Force NCM Pay */}
      {dossier.resPayRows.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#1e3a5f] shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900">{sh.resForcePay}</h3>
              <span className="text-xs text-slate-500">· {dict.tables.tables.F.shortTitle}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {['F:general:1', 'F:note:1', 'F:note:2'].map((k) => (
                <FootnoteBadge
                  key={k}
                  noteKey={k}
                  entry={footnoteMap[k]}
                  onSelect={handleSelectNote}
                  variant="compact"
                />
              ))}
            </div>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[4%] tabular-nums">{c.row}</th>
                  <th className="py-2.5 px-2.5 lg:w-[8%]">{c.category}</th>
                  <th className="py-2.5 px-2.5 lg:w-[23%]">{c.qualifications}</th>
                  <th className="py-2.5 px-2.5 lg:w-[11%]">{c.rank}</th>
                  <th className="py-2.5 px-2.5 lg:w-[10%]">{c.payIncrement}</th>
                  <th className="py-2.5 px-2.5 lg:w-[10%]">{c.tcp}</th>
                  <th className="py-2.5 px-2.5 lg:w-[24%]">{c.bypassed}</th>
                  <th className="py-2.5 px-2.5 lg:w-[10%]">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossier.resPayRows.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 text-slate-500 tabular-nums">{row.rowNumber}</td>
                    <td className="py-2.5 px-2.5 font-semibold text-slate-900 break-words">
                      {row.category}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">
                      {row.specificQualifications || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 break-words">
                      {row.rank || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 tabular-nums break-words">
                      {row.payIncrement || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 tabular-nums break-words">
                      {row.tcp || '—'}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">
                      {row.bypassedOrAwarded || '—'}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex flex-wrap gap-1">
                        {row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* List G — Reserve Force Accredited Programs */}
      {dossier.resPrograms.length > 0 && (
        <ProgramTableSection
          title={sh.programsRes}
          tableId="G"
          programs={dossier.resPrograms}
          footnoteMap={footnoteMap}
          onSelectNote={handleSelectNote}
        />
      )}

      {/* List H — NCMSTEP Career Profiles */}
      {dossier.careerProfiles.map((cp) => (
        <section
          key={cp.id}
          className="bg-white border border-slate-200 rounded-lg overflow-hidden"
        >
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#1e3a5f] shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900">
                {sh.careerProfile} — {cp.occupationLabel}
              </h3>
            </div>
            <div className="flex flex-wrap gap-1">
              {cp.resolvedNoteKeys.map((k) => (
                <FootnoteBadge
                  key={k}
                  noteKey={k}
                  entry={footnoteMap[k]}
                  onSelect={handleSelectNote}
                  variant="compact"
                />
              ))}
            </div>
          </div>

          {cp.headerNotice && (
            <div className="px-5 py-2.5 bg-sky-50/60 border-b border-sky-100 text-xs text-slate-700">
              {cp.headerNotice}
            </div>
          )}

          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[6%] tabular-nums">{c.step}</th>
                  <th className="py-2.5 px-2.5 lg:w-[52%]">{c.requirement}</th>
                  <th className="py-2.5 px-2.5 lg:w-[14%]">{c.rank}</th>
                  <th className="py-2.5 px-2.5 lg:w-[14%]">{c.payIncrement}</th>
                  <th className="py-2.5 px-2.5 lg:w-[14%]">{c.approxTime}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cp.steps.map((s) => (
                  <tr key={s.step} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 font-semibold text-[#1e3a5f] tabular-nums">
                      {s.step}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-800 break-words">{s.requirement}</td>
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 break-words">
                      {s.rank}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-800 tabular-nums break-words">
                      {s.payIncrement}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-600 tabular-nums break-words">
                      {s.approxTime}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {cp.occupationNotes.length > 0 && (
            <div className="px-5 py-3 bg-slate-50/60 border-t border-slate-200 space-y-1 text-xs text-slate-700">
              {cp.occupationNotes.map((n, idx) => (
                <p key={idx}>• {n}</p>
              ))}
            </div>
          )}
        </section>
      ))}

      {/* List I — NCMSTEP Subsidized Programs */}
      {dossier.ncmstepPrograms.length > 0 && (
        <ProgramTableSection
          title={sh.programsNcmstep}
          tableId="I"
          programs={dossier.ncmstepPrograms}
          footnoteMap={footnoteMap}
          onSelectNote={handleSelectNote}
        />
      )}

      {/* List J-1 — CORA Section */}
      {dossier.coraEntry && (
        <section className="bg-white border border-amber-300 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-amber-50/70 border-b border-amber-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-800 shrink-0" />
              <h3 className="text-sm font-semibold text-slate-900">{sh.coraSection}</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['J-1:ref:A', 'J-1:ref:D', 'J-1:ref:E', 'J-1:ref:F'].map((k) => (
                <FootnoteBadge
                  key={k}
                  noteKey={k}
                  entry={footnoteMap[k]}
                  onSelect={handleSelectNote}
                  variant="compact"
                />
              ))}
            </div>
          </div>
          <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-500 block">{c.effectiveDate}</span>
              <span className="font-semibold text-slate-900 tabular-nums mt-0.5 block">
                {dossier.coraEntry.effectiveDate}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">{c.removalDate}</span>
              <span className="font-semibold text-slate-900 tabular-nums mt-0.5 block">
                {dossier.coraEntry.requiredRemovalDate}
              </span>
            </div>
            <div>
              <span className="text-slate-500 block">{c.endDate}</span>
              <span className="font-semibold text-slate-900 tabular-nums mt-0.5 block">
                {dossier.coraEntry.endDate || '—'}
              </span>
            </div>
            {dossier.coraEntry.specialNote && (
              <div className="sm:col-span-3 pt-2 border-t border-slate-100 text-slate-700">
                {dossier.coraEntry.specialNote}
              </div>
            )}
          </div>
        </section>
      )}

      {/* List K — Non-Occupation Specific Incentives (NCMs) */}
      {dossier.nonOccIncentives.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
            <Building2 className="w-4 h-4 text-[#1e3a5f] shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900">{sh.nonOccSection}</h3>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[18%]">{c.priorExperience}</th>
                  <th className="py-2.5 px-2.5 lg:w-[30%]">{c.criteria}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.rank}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.payIncrement}</th>
                  <th className="py-2.5 px-2.5 lg:w-[16%]">{c.incentiveCredit}</th>
                  <th className="py-2.5 px-2.5 lg:w-[12%]">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossier.nonOccIncentives.map((row) => (
                  <tr key={row.rowNumber} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 break-words">
                      {row.priorExperience}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">{row.criteria}</td>
                    <td className="py-2.5 px-2.5 text-slate-800 break-words">{row.rank}</td>
                    <td className="py-2.5 px-2.5 text-slate-800 tabular-nums break-words">
                      {row.payIncrement}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-800 tabular-nums break-words">
                      {row.incentiveCredit}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex flex-wrap gap-1">
                        {row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* List L — Leave Credit on Enrolment */}
      {dossier.leaveCredits.length > 0 && (
        <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center gap-2.5">
            <Calendar className="w-4 h-4 text-[#1e3a5f] shrink-0" />
            <h3 className="text-sm font-semibold text-slate-900">{sh.leaveCreditSection}</h3>
          </div>
          <div className="overflow-x-auto lg:overflow-x-visible">
            <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-semibold uppercase tracking-wider text-slate-600 align-bottom">
                  <th className="py-2.5 px-2.5 lg:w-[24%]">{c.applicableTo}</th>
                  <th className="py-2.5 px-2.5 lg:w-[42%]">{c.conditions}</th>
                  <th className="py-2.5 px-2.5 lg:w-[18%]">{c.leaveCredit}</th>
                  <th className="py-2.5 px-2.5 lg:w-[16%]">{c.notes}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossier.leaveCredits.map((row) => (
                  <tr key={row.rowNumber} className="hover:bg-slate-50/70 align-top">
                    <td className="py-2.5 px-2.5 font-medium text-slate-900 break-words">
                      {row.rankOrApplicableTo}
                    </td>
                    <td className="py-2.5 px-2.5 text-slate-700 break-words">
                      {row.conditionOrPayIncrement}
                    </td>
                    <td className="py-2.5 px-2.5 font-semibold text-slate-900 tabular-nums break-words">
                      {row.leaveCredit}
                    </td>
                    <td className="py-2.5 px-2.5">
                      <div className="flex flex-wrap gap-1">
                        {row.resolvedNoteKeys.map((k) => (
                          <FootnoteBadge
                            key={k}
                            noteKey={k}
                            entry={footnoteMap[k]}
                            onSelect={handleSelectNote}
                            variant="compact"
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Consolidated Linked Footnotes Register */}
      <FootnotePanel
        groupedFootnotes={dossier.groupedFootnotes}
        highlightedKey={highlightedKey}
        onClearHighlight={() => setHighlightedKey(null)}
      />

      {/* Print-only footer */}
      <div className="hidden print:block text-[11px] text-slate-500 pt-4 border-t border-slate-300">
        {dict.core.printFooterNote}
      </div>
    </div>
  );
};
