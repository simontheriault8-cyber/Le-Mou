import React from 'react';
import type { FootnoteEntry } from '../types/mol';
import { useLanguage } from '../context/LanguageContext';
import { formatFootnoteBadgeLabel } from '../utils/footnoteResolver';

interface FootnoteBadgeProps {
  noteKey: string;
  entry?: FootnoteEntry;
  onSelect: (key: string) => void;
  variant?: 'default' | 'compact';
}

export const FootnoteBadge: React.FC<FootnoteBadgeProps> = ({
  noteKey,
  entry,
  onSelect,
  variant = 'default',
}) => {
  const { language } = useLanguage();
  const label = formatFootnoteBadgeLabel(entry ?? noteKey, language);
  const titleText = entry
    ? `${entry.title ? `${entry.title}: ` : ''}${entry.text.slice(0, 140)}${entry.text.length > 140 ? '…' : ''}`
    : noteKey;

  return (
    <button
      type="button"
      onClick={() => onSelect(noteKey)}
      title={titleText}
      className={`inline-flex items-center font-medium tabular-nums rounded border transition-colors cursor-pointer whitespace-nowrap shrink-0 print:border-slate-400 print:text-slate-900 ${
        variant === 'compact'
          ? 'px-1.5 py-0.5 text-[11px] leading-tight'
          : 'px-2 py-0.5 text-xs leading-tight'
      } ${
        entry
          ? 'bg-sky-50 text-[#1e3a5f] border-sky-200 hover:bg-[#1e3a5f] hover:text-white hover:border-[#1e3a5f]'
          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-200'
      }`}
    >
      {label}
    </button>
  );
};
