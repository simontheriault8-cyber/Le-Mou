import React from 'react';
import { Printer } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type WorkspaceView = 'dossier' | 'simulator' | 'compare' | 'programs';

interface TopBarProps {
  activeView: WorkspaceView;
  onChangeView: (view: WorkspaceView) => void;
  activeForce: 'reg' | 'res';
  onChangeForce: (force: 'reg' | 'res') => void;
  onPrint: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  onChangeView,
  activeForce,
  onChangeForce,
  onPrint,
}) => {
  const { dict } = useLanguage();

  const navItems: { id: WorkspaceView; label: string }[] = [
    { id: 'dossier', label: dict.core.navDossier },
    { id: 'simulator', label: dict.core.navSimulator },
    { id: 'compare', label: dict.core.navCompare },
    { id: 'programs', label: dict.core.navPrograms },
  ];

  return (
    <header className="bg-[#1e3a5f] text-white border-b border-slate-900/20 print:hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4 lg:gap-6">
        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={() => onChangeView('dossier')}
            className="text-base font-bold tracking-tight whitespace-nowrap shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
          >
            {dict.core.brandTitle}
          </button>

          <div
            role="group"
            aria-label={dict.core.forceSwitchLabel}
            className="inline-flex items-center rounded-md bg-slate-950/35 border border-white/20 p-0.5 shrink-0"
          >
            <button
              type="button"
              onClick={() => onChangeForce('reg')}
              aria-pressed={activeForce === 'reg'}
              title={dict.core.forceRegFull}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeForce === 'reg'
                  ? 'bg-white text-[#1e3a5f] shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {dict.core.forceRegShort}
            </button>
            <button
              type="button"
              onClick={() => onChangeForce('res')}
              aria-pressed={activeForce === 'res'}
              title={dict.core.forceResFull}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                activeForce === 'res'
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'text-slate-200 hover:text-white hover:bg-white/10'
              }`}
            >
              {dict.core.forceResShort}
            </button>
          </div>
        </div>

        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#1e3a5f] shadow-xs'
                    : 'text-slate-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={onPrint}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <Printer className="w-4 h-4 shrink-0" />
          <span className="hidden sm:inline">{dict.core.printSummary}</span>
        </button>
      </div>
    </header>
  );
};
