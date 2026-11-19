import React, { useMemo, useState } from 'react';
import { ArrowLeftRight, Columns2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMolData } from '../context/DataContext';
import { buildOccupationDossier } from '../utils/occupationAggregator';

interface OccupationComparatorProps {
  activeForce: 'reg' | 'res';
  initialLeftId?: string;
}

export const OccupationComparator: React.FC<OccupationComparatorProps> = ({
  activeForce,
  initialLeftId,
}) => {
  const { language, dict } = useLanguage();
  const { datasets } = useMolData();
  const occupations = useMemo(
    () => datasets.occupations.filter((o) => o.forces.includes(activeForce)),
    [datasets.occupations, activeForce]
  );

  const [leftId, setLeftId] = useState<string>(
    initialLeftId || occupations[0]?.id || '00299'
  );
  const [rightId, setRightId] = useState<string>(
    occupations.find((o) => o.id !== (initialLeftId || occupations[0]?.id))?.id || '00109'
  );

  const leftOcc = useMemo(
    () => occupations.find((o) => o.id === leftId) ?? occupations[0],
    [occupations, leftId]
  );
  const rightOcc = useMemo(
    () =>
      occupations.find((o) => o.id === rightId) ??
      occupations.find((o) => o.id !== leftOcc?.id) ??
      occupations[0],
    [occupations, rightId, leftOcc]
  );

  const leftDossier = useMemo(
    () => buildOccupationDossier(leftOcc, datasets, activeForce),
    [leftOcc, datasets, activeForce]
  );
  const rightDossier = useMemo(
    () => buildOccupationDossier(rightOcc, datasets, activeForce),
    [rightOcc, datasets, activeForce]
  );

  const cv = dict.tables.compareView;

  const handleSwap = () => {
    setLeftId(rightId);
    setRightId(leftId);
  };

  const formatOccOption = (o: (typeof occupations)[number]) =>
    `${o.mosid} · ${o.acronym} — ${language === 'fr' ? o.titleFr : o.titleEn}`;

  const renderRegPathways = (d: typeof leftDossier) => {
    if (d.occupation.personnelType === 'officer') {
      if (d.officerRegRows.length === 0) return '—';
      return (
        <ul className="space-y-1">
          {d.officerRegRows.map((r) => (
            <li key={r.id}>
              <span className="font-semibold text-slate-900">{r.productionPlan}</span>
              {' · '}
              <span className="text-slate-700">{r.applicableTo}</span>
              {' · '}
              <span className="tabular-nums text-[#1e3a5f] font-medium">{r.payIncrement}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (d.regPayRows.length === 0) return '—';
    return (
      <ul className="space-y-1.5">
        {d.regPayRows.map((r) => (
          <li key={r.id}>
            <span className="font-semibold text-slate-900">{r.category}</span>
            {' · '}
            <span>{r.rank}</span>
            {' · '}
            <span className="tabular-nums">{r.payIncrement}</span>
            {r.tcp && r.tcp !== '0' && (
              <span className="text-slate-600 tabular-nums"> · {r.tcp}</span>
            )}
            {r.recruitmentAllowance && (
              <div className="text-[11px] font-medium text-[#1e3a5f] tabular-nums">
                {r.recruitmentAllowance}
              </div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  const renderResPathways = (d: typeof leftDossier) => {
    if (d.occupation.personnelType === 'officer') {
      if (d.officerResRows.length === 0) return '—';
      return (
        <ul className="space-y-1">
          {d.officerResRows.map((r) => (
            <li key={r.id}>
              <span className="font-semibold text-slate-900">{r.productionPlan}</span>
              {' · '}
              <span className="tabular-nums">{r.payIncrement}</span>
            </li>
          ))}
        </ul>
      );
    }
    if (d.resPayRows.length === 0) return '—';
    return (
      <ul className="space-y-1">
        {d.resPayRows.map((r) => (
          <li key={r.id}>
            <span className="font-semibold text-slate-900">{r.category}</span>
            {' · '}
            <span>{r.rank}</span>
            {' · '}
            <span className="tabular-nums">{r.payIncrement}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderCora = (d: typeof leftDossier) => {
    if (!d.coraEntry) {
      return (
        <span className="text-slate-500">
          {language === 'fr' ? 'Non admissible' : 'Not eligible'}
        </span>
      );
    }
    return (
      <div className="space-y-0.5 tabular-nums">
        <div className="font-semibold text-amber-900">
          {language === 'fr' ? 'Admissible IRGPC' : 'CORA Eligible'}
        </div>
        <div className="text-[11px] text-slate-600">
          {dict.tables.columns.effectiveDate}: {d.coraEntry.effectiveDate}
        </div>
        <div className="text-[11px] text-slate-600">
          {dict.tables.columns.removalDate}: {d.coraEntry.requiredRemovalDate}
        </div>
      </div>
    );
  };

  const renderCareerSteps = (d: typeof leftDossier) => {
    if (d.careerProfiles.length === 0) return '—';
    const stepsCount = d.careerProfiles.reduce((acc, p) => acc + p.steps.length, 0);
    return (
      <div className="space-y-1">
        <div className="font-semibold text-slate-900 tabular-nums">
          {d.careerProfiles.length} {language === 'fr' ? 'profil(s)' : 'profile(s)'} · {stepsCount}{' '}
          {language === 'fr' ? 'étapes' : 'steps'}
        </div>
        {d.careerProfiles.map((cp) => (
          <div key={cp.id} className="text-[11px] text-slate-600">
            {cp.occupationLabel}: {cp.steps[0]?.rank} → {cp.steps[cp.steps.length - 1]?.rank}
          </div>
        ))}
      </div>
    );
  };

  const rows =
    activeForce === 'reg'
      ? [
          {
            label: dict.tables.columns.command,
            left: `${dict.core.commandLabels[leftOcc.command] || leftOcc.command} · ${leftOcc.mosid}`,
            right: `${dict.core.commandLabels[rightOcc.command] || rightOcc.command} · ${rightOcc.mosid}`,
          },
          {
            label: cv.regCategories,
            left: renderRegPathways(leftDossier),
            right: renderRegPathways(rightDossier),
          },
          {
            label: cv.regProgramsCount,
            left: <span className="font-semibold tabular-nums">{leftDossier.regPrograms.length}</span>,
            right: <span className="font-semibold tabular-nums">{rightDossier.regPrograms.length}</span>,
          },
          {
            label: cv.piesmrSteps,
            left: renderCareerSteps(leftDossier),
            right: renderCareerSteps(rightDossier),
          },
          {
            label: cv.piesmrProgramsCount,
            left: <span className="font-semibold tabular-nums">{leftDossier.ncmstepPrograms.length}</span>,
            right: <span className="font-semibold tabular-nums">{rightDossier.ncmstepPrograms.length}</span>,
          },
          {
            label: cv.coraStatus,
            left: renderCora(leftDossier),
            right: renderCora(rightDossier),
          },
          {
            label: cv.keyNotesCount,
            left: <span className="font-semibold text-[#1e3a5f] tabular-nums">{leftDossier.totalLinkedNotes}</span>,
            right: <span className="font-semibold text-[#1e3a5f] tabular-nums">{rightDossier.totalLinkedNotes}</span>,
          },
        ]
      : [
          {
            label: dict.tables.columns.command,
            left: `${dict.core.commandLabels[leftOcc.command] || leftOcc.command} · ${leftOcc.mosid}`,
            right: `${dict.core.commandLabels[rightOcc.command] || rightOcc.command} · ${rightOcc.mosid}`,
          },
          {
            label: cv.resCategories,
            left: renderResPathways(leftDossier),
            right: renderResPathways(rightDossier),
          },
          {
            label: cv.resProgramsCount,
            left: <span className="font-semibold tabular-nums">{leftDossier.resPrograms.length}</span>,
            right: <span className="font-semibold tabular-nums">{rightDossier.resPrograms.length}</span>,
          },
          {
            label: cv.keyNotesCount,
            left: <span className="font-semibold text-[#1e3a5f] tabular-nums">{leftDossier.totalLinkedNotes}</span>,
            right: <span className="font-semibold text-[#1e3a5f] tabular-nums">{rightDossier.totalLinkedNotes}</span>,
          },
        ];

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-lg p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div>
            <div className="flex items-center gap-2 text-[#1e3a5f]">
              <Columns2 className="w-4 h-4" />
              <h2 className="text-lg font-bold text-slate-900">{cv.title}</h2>
            </div>
            <p className="text-xs text-slate-600 mt-1">{cv.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={handleSwap}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#1e3a5f] bg-slate-50 border border-slate-300 rounded hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <ArrowLeftRight className="w-3.5 h-3.5" />
            {cv.swapButton}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {cv.leftOccupation}
            </label>
            <select
              value={leftOcc.id}
              onChange={(e) => setLeftId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            >
              {occupations.map((o) => (
                <option key={o.id} value={o.id}>
                  {formatOccOption(o)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {cv.rightOccupation}
            </label>
            <select
              value={rightOcc.id}
              onChange={(e) => setRightId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            >
              {occupations.map((o) => (
                <option key={o.id} value={o.id}>
                  {formatOccOption(o)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="w-full table-auto lg:table-fixed text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                <th className="py-3 px-4 lg:w-[20%]">{cv.metricLabel}</th>
                <th className="py-3 px-4 lg:w-[40%] text-[#1e3a5f]">
                  {leftOcc.acronym} ({leftOcc.mosid})
                </th>
                <th className="py-3 px-4 lg:w-[40%] text-[#1e3a5f]">
                  {rightOcc.acronym} ({rightOcc.mosid})
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((row) => (
                <tr key={row.label} className="align-top hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 font-semibold text-slate-800 bg-slate-50/40 break-words">
                    {row.label}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 break-words">{row.left}</td>
                  <td className="py-3.5 px-4 text-slate-700 break-words">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
