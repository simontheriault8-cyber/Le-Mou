/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { DataProvider, useMolData } from './context/DataContext';
import { TopBar, type WorkspaceView } from './components/TopBar';
import { WorkspaceToolbar } from './components/WorkspaceToolbar';
import { OccupationSidebar } from './components/OccupationSidebar';
import { OccupationDossier } from './components/OccupationDossier';
import { EligibilitySimulator } from './components/EligibilitySimulator';
import { OccupationComparator } from './components/OccupationComparator';
import { ProgramExplorer } from './components/ProgramExplorer';
import { GlossaryModal } from './components/GlossaryModal';
import { buildOccupationDossier } from './utils/occupationAggregator';

const MainWorkspace: React.FC = () => {
  const { dict } = useLanguage();
  const { datasets } = useMolData();

  const [activeView, setActiveView] = useState<WorkspaceView>('dossier');
  const [activeForce, setActiveForce] = useState<'reg' | 'res'>('reg');
  const [selectedId, setSelectedId] = useState<string>('00299');
  const [searchQuery, setSearchQuery] = useState('');
  const [personnelFilter, setPersonnelFilter] = useState<'all' | 'ncm' | 'officer'>('all');
  const [commandFilter, setCommandFilter] = useState<string>('ALL');
  const [coraOnly, setCoraOnly] = useState(false);
  const [glossaryOpen, setGlossaryOpen] = useState(false);

  const forceOccupations = useMemo(
    () => datasets.occupations.filter((o) => o.forces.includes(activeForce)),
    [datasets.occupations, activeForce]
  );

  const selectedOccupation = useMemo(
    () =>
      forceOccupations.find((o) => o.id === selectedId) ??
      forceOccupations[0],
    [forceOccupations, selectedId]
  );

  const dossier = useMemo(
    () =>
      selectedOccupation
        ? buildOccupationDossier(selectedOccupation, datasets, activeForce)
        : undefined,
    [selectedOccupation, datasets, activeForce]
  );

  const handleChangeForce = (force: 'reg' | 'res') => {
    setActiveForce(force);
    if (force === 'res') {
      setCoraOnly(false);
    }
  };

  const handlePrint = () => {
    if (activeView !== 'dossier') {
      setActiveView('dossier');
      setTimeout(() => window.print(), 120);
    } else {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col">
      <TopBar
        activeView={activeView}
        onChangeView={setActiveView}
        activeForce={activeForce}
        onChangeForce={handleChangeForce}
        onPrint={handlePrint}
      />

      <WorkspaceToolbar
        activeForce={activeForce}
        onOpenGlossary={() => setGlossaryOpen(true)}
      />

      <main className="flex-1 max-w-[1920px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {activeView === 'dossier' && (
          <div className="flex flex-col lg:flex-row gap-5 items-start">
            <div className="w-full lg:w-[272px] shrink-0 print:hidden lg:sticky lg:top-4">
              <OccupationSidebar
                occupations={forceOccupations}
                activeForce={activeForce}
                selectedId={selectedOccupation?.id ?? ''}
                onSelect={setSelectedId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                personnelFilter={personnelFilter}
                onPersonnelFilterChange={setPersonnelFilter}
                commandFilter={commandFilter}
                onCommandFilterChange={setCommandFilter}
                coraOnly={coraOnly}
                onCoraOnlyChange={setCoraOnly}
              />
            </div>

            <div className="flex-1 min-w-0 w-full">
              {dossier ? (
                <OccupationDossier
                  dossier={dossier}
                  activeForce={activeForce}
                  footnoteMap={datasets.footnoteMap}
                />
              ) : (
                <div className="bg-white border border-slate-200 rounded-lg p-10 text-center">
                  <h2 className="text-base font-semibold text-slate-900">
                    {dict.core.selectOccupationTitle}
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    {dict.core.selectOccupationHint}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeView === 'simulator' && (
          <EligibilitySimulator
            activeForce={activeForce}
            initialOccupationId={selectedOccupation?.id}
          />
        )}

        {activeView === 'compare' && (
          <OccupationComparator
            activeForce={activeForce}
            initialLeftId={selectedOccupation?.id}
          />
        )}

        {activeView === 'programs' && <ProgramExplorer activeForce={activeForce} />}
      </main>

      <GlossaryModal open={glossaryOpen} onClose={() => setGlossaryOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <MainWorkspace />
      </DataProvider>
    </LanguageProvider>
  );
}
