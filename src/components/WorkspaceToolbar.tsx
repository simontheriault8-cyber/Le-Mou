import React from 'react';
import { BookText } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface WorkspaceToolbarProps {
  activeForce: 'reg' | 'res';
  onOpenGlossary: () => void;
}

export const WorkspaceToolbar: React.FC<WorkspaceToolbarProps> = ({
  activeForce,
  onOpenGlossary,
}) => {
  const { language, setLanguage, dict } = useLanguage();

  return (
    <div className="bg-white border-b border-slate-200 print:hidden">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
          <span className="font-medium text-slate-800">{dict.core.versionTag}</span>
          <span className="text-slate-300">·</span>
          <span
            className={`px-2 py-0.5 rounded font-semibold ${
              activeForce === 'reg'
                ? 'bg-sky-50 text-[#1e3a5f] border border-sky-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            {activeForce === 'reg' ? dict.core.forceRegFull : dict.core.forceResFull}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onOpenGlossary}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-[#1e3a5f] transition-colors cursor-pointer"
          >
            <BookText className="w-3.5 h-3.5" />
            <span>{dict.glossary.sectionTitle}</span>
          </button>

          <div
            role="group"
            aria-label={dict.core.languageSwitchLabel}
            className="inline-flex rounded-md border border-slate-300 bg-slate-50 p-0.5"
          >
            <button
              type="button"
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-0.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                language === 'fr'
                  ? 'bg-[#1e3a5f] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              FR
            </button>
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-[#1e3a5f] text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
