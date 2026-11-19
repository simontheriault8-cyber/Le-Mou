import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Calculator, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useMolData } from '../context/DataContext';
import { buildOccupationDossier } from '../utils/occupationAggregator';
import {
  evaluateEligibility,
  type PriorCafChoice,
  type YouthProgramChoice,
} from '../utils/eligibilityCalculator';
import { resolveAndGroupFootnotes } from '../utils/footnoteResolver';
import { FootnoteBadge } from './FootnoteBadge';
import { FootnotePanel } from './FootnotePanel';

interface EligibilitySimulatorProps {
  activeForce: 'reg' | 'res';
  initialOccupationId?: string;
}

export const EligibilitySimulator: React.FC<EligibilitySimulatorProps> = ({
  activeForce,
  initialOccupationId,
}) => {
  const { language, dict } = useLanguage();
  const { datasets } = useMolData();
  const sim = dict.simulator;

  const forceOccupations = useMemo(
    () => datasets.occupations.filter((o) => o.forces.includes(activeForce)),
    [datasets.occupations, activeForce]
  );

  const [occupationId, setOccupationId] = useState<string>(
    initialOccupationId || forceOccupations[0]?.id || '00299'
  );
  const [selectedPayRowId, setSelectedPayRowId] = useState<string>('');
  const [experienceYears, setExperienceYears] = useState<number>(0);
  const [diplomaOverFiveYears, setDiplomaOverFiveYears] = useState<boolean>(false);
  const [youthProgram, setYouthProgram] = useState<YouthProgramChoice>('none');
  const [priorCafService, setPriorCafService] = useState<PriorCafChoice>('none');
  const [highlightedKey, setHighlightedKey] = useState<string | null>(null);

  useEffect(() => {
    if (activeForce === 'res' && youthProgram === 'cafiep') {
      setYouthProgram('none');
    }
  }, [activeForce, youthProgram]);

  const selectedOccupation = useMemo(
    () =>
      forceOccupations.find((o) => o.id === occupationId) ??
      forceOccupations[0],
    [forceOccupations, occupationId]
  );

  const dossier = useMemo(
    () => buildOccupationDossier(selectedOccupation, datasets, activeForce),
    [selectedOccupation, datasets, activeForce]
  );

  const pathwayOptions = useMemo(() => {
    if (selectedOccupation.personnelType === 'officer') {
      const rows = activeForce === 'reg' ? dossier.officerRegRows : dossier.officerResRows;
      return rows.map((r) => ({
        id: r.id,
        label: `${r.productionPlan} — ${r.applicableTo} (${r.payIncrement})`,
      }));
    }
    const rows = activeForce === 'reg' ? dossier.regPayRows : dossier.resPayRows;
    return rows.map((r) => ({
      id: r.id,
      label: `${r.category} — ${r.rank} / ${r.payIncrement}${
        r.specificQualifications ? ` · ${r.specificQualifications.slice(0, 65)}${r.specificQualifications.length > 65 ? '…' : ''}` : ''
      }`,
    }));
  }, [selectedOccupation, activeForce, dossier]);

  useEffect(() => {
    if (pathwayOptions.length > 0 && !pathwayOptions.some((p) => p.id === selectedPayRowId)) {
      setSelectedPayRowId(pathwayOptions[0].id);
    } else if (pathwayOptions.length === 0) {
      setSelectedPayRowId('');
    }
  }, [pathwayOptions, selectedPayRowId]);

  const outcome = useMemo(
    () =>
      evaluateEligibility(
        {
          force: activeForce,
          occupation: selectedOccupation,
          selectedPayRowId,
          experienceYears,
          diplomaOverFiveYears,
          youthProgram: selectedOccupation.personnelType === 'ncm' ? youthProgram : 'none',
          priorCafService,
        },
        {
          regPayRows: dossier.regPayRows,
          resPayRows: dossier.resPayRows,
          officerRegRows: dossier.officerRegRows,
          officerAllowanceRows: dossier.officerAllowanceRows,
          officerResRows: dossier.officerResRows,
          coraEntry: dossier.coraEntry,
          nonOccEntries: dossier.nonOccIncentives,
          leaveEntries: dossier.leaveCredits,
        },
        language
      ),
    [
      activeForce,
      selectedOccupation,
      selectedPayRowId,
      experienceYears,
      diplomaOverFiveYears,
      youthProgram,
      priorCafService,
      dossier,
      language,
    ]
  );

  const groupedGoverningNotes = useMemo(
    () =>
      resolveAndGroupFootnotes(
        outcome.governingNoteKeys,
        datasets.footnoteMap,
        [selectedOccupation.mosid, selectedOccupation.acronym],
        activeForce
      ),
    [outcome.governingNoteKeys, datasets.footnoteMap, selectedOccupation, activeForce]
  );

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
          <Calculator className="w-5 h-5" />
          <h2 className="text-lg font-bold text-slate-900">{sim.title}</h2>
        </div>
        <p className="text-xs text-slate-600 mt-1">{sim.subtitle}</p>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Active Component Badge */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {sim.forceLabel}
            </label>
            <div
              className={`px-3 py-2 text-xs font-semibold rounded-md border ${
                activeForce === 'reg'
                  ? 'bg-sky-50 text-[#1e3a5f] border-sky-200'
                  : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}
            >
              {activeForce === 'reg' ? dict.core.forceRegFull : dict.core.forceResFull}
            </div>
          </div>

          {/* Target Occupation */}
          <div className="lg:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {sim.occupationLabel}
            </label>
            <select
              value={selectedOccupation.id}
              onChange={(e) => setOccupationId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            >
              {forceOccupations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.mosid} · {o.acronym} — {language === 'fr' ? o.titleFr : o.titleEn}
                </option>
              ))}
            </select>
          </div>

          {/* Pathway / Category */}
          <div className="md:col-span-2 lg:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {sim.pathwayLabel}
            </label>
            <select
              value={selectedPayRowId}
              onChange={(e) => setSelectedPayRowId(e.target.value)}
              disabled={pathwayOptions.length === 0}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f] disabled:bg-slate-100"
            >
              {pathwayOptions.length === 0 ? (
                <option value="">
                  {language === 'fr'
                    ? 'Aucune voie répertoriée pour cet élément'
                    : 'No pathway listed for this component'}
                </option>
              ) : (
                pathwayOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Relevant Experience */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {sim.experienceYearsLabel} ({experienceYears})
            </label>
            <input
              type="range"
              min={0}
              max={15}
              step={1}
              value={experienceYears}
              onChange={(e) => setExperienceYears(Number(e.target.value))}
              className="w-full accent-[#1e3a5f] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-500 tabular-nums mt-0.5">
              <span>0</span>
              <span>5</span>
              <span>10</span>
              <span>15+</span>
            </div>
          </div>

          {/* Diploma Age */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {sim.diplomaAgeLabel}
            </label>
            <select
              value={diplomaOverFiveYears ? 'over5' : 'recent'}
              onChange={(e) => setDiplomaOverFiveYears(e.target.value === 'over5')}
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
            >
              <option value="recent">{sim.diplomaRecent}</option>
              <option value="over5">{sim.diplomaOverFiveYears}</option>
            </select>
          </div>

          {/* Youth Program (NCM only) */}
          {selectedOccupation.personnelType === 'ncm' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {sim.youthProgramLabel}
              </label>
              <select
                value={youthProgram}
                onChange={(e) => setYouthProgram(e.target.value as YouthProgramChoice)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
              >
                <option value="none">{sim.youthNone}</option>
                <option value="cadets3">{sim.youthCadets3}</option>
                <option value="cadets4">{sim.youthCadets4}</option>
                <option value="cadets5">{sim.youthCadets5}</option>
                <option value="jcr3">{sim.youthJcr3}</option>
                <option value="jcr4">{sim.youthJcr4}</option>
                <option value="jcr5">{sim.youthJcr5}</option>
                {activeForce === 'reg' && (
                  <option value="cafiep">{sim.youthCafiep}</option>
                )}
              </select>
            </div>
          )}

          {/* Prior CAF Service (NCM only) */}
          {selectedOccupation.personnelType === 'ncm' && (
            <div className="md:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {sim.priorCafServiceLabel}
              </label>
              <select
                value={priorCafService}
                onChange={(e) => setPriorCafService(e.target.value as PriorCafChoice)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-md focus:outline-none focus:border-[#1e3a5f]"
              >
                <option value="none">{sim.priorCafNone}</option>
                <option value="less5">{sim.priorCafLess5}</option>
                <option value="more5">{sim.priorCafMore5}</option>
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Assessment Result */}
      <section className="bg-white border border-slate-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#1e3a5f]" />
            <h3 className="text-sm font-semibold text-slate-900">{sim.resultsTitle}</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {outcome.governingNoteKeys.map((k) => (
              <FootnoteBadge
                key={k}
                noteKey={k}
                entry={datasets.footnoteMap[k]}
                onSelect={handleSelectNote}
                variant="compact"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200">
          <div className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {sim.entryRank}
            </div>
            <div className="text-base font-bold text-slate-900 mt-1">{outcome.entryRank}</div>
          </div>
          <div className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {sim.startingPi}
            </div>
            <div className="text-base font-bold text-[#1e3a5f] tabular-nums mt-1">
              {outcome.startingPi}
            </div>
          </div>
          <div className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {sim.tcpCredit}
            </div>
            <div className="text-base font-bold text-slate-900 tabular-nums mt-1">
              {outcome.tcpSummary}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 divide-y divide-slate-200 text-xs">
          <div className="px-6 py-3.5 grid grid-cols-1 md:grid-cols-3 gap-2">
            <span className="font-semibold text-slate-700">{sim.allowanceOutcome}</span>
            <span className="md:col-span-2 font-medium text-[#1e3a5f] tabular-nums">
              {outcome.allowanceSummary}
            </span>
          </div>
          <div className="px-6 py-3.5 grid grid-cols-1 md:grid-cols-3 gap-2">
            <span className="font-semibold text-slate-700">{sim.leaveCredit}</span>
            <span className="md:col-span-2 text-slate-800 tabular-nums">
              {outcome.leaveCreditSummary}
            </span>
          </div>
          <div className="px-6 py-3.5 grid grid-cols-1 md:grid-cols-3 gap-2">
            <span className="font-semibold text-slate-700">{sim.bypassedOutcome}</span>
            <span className="md:col-span-2 text-slate-700">{outcome.bypassedSummary}</span>
          </div>
        </div>

        {outcome.warnings.length > 0 && (
          <div className="px-6 py-4 bg-amber-50/70 border-t border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{sim.warningsTitle}</span>
            </div>
            <ul className="space-y-1 text-xs text-amber-900 list-disc pl-5">
              {outcome.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <FootnotePanel
        groupedFootnotes={groupedGoverningNotes}
        highlightedKey={highlightedKey}
        onClearHighlight={() => setHighlightedKey(null)}
      />
    </div>
  );
};
