import React from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GlossaryModalProps {
  open: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ open, onClose }) => {
  const { dict } = useLanguage();

  if (!open) return null;

  const entries = Object.values(dict.glossary.terms);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="glossary-modal-title"
    >
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
          <h2 id="glossary-modal-title" className="text-base font-semibold text-slate-900">
            {dict.glossary.sectionTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={dict.core.close}
            className="p-1 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto divide-y divide-slate-100">
          {entries.map((term) => (
            <div key={term.code} className="py-3 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                <span className="text-sm font-bold text-[#1e3a5f] tabular-nums">
                  {term.code}
                </span>
                <span className="text-xs font-semibold text-slate-700">
                  · {term.label}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{term.definition}</p>
            </div>
          ))}
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-md text-xs font-semibold bg-[#1e3a5f] text-white hover:bg-[#162d4b] cursor-pointer"
          >
            {dict.core.close}
          </button>
        </div>
      </div>
    </div>
  );
};
