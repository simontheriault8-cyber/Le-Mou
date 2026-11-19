import React, { useEffect, useState } from 'react';
import { BookOpen, ChevronDown, ChevronRight, Link2 } from 'lucide-react';
import type { GroupedFootnotes } from '../utils/footnoteResolver';
import { useLanguage } from '../context/LanguageContext';

interface FootnotePanelProps {
  groupedFootnotes: GroupedFootnotes[];
  highlightedKey: string | null;
  onClearHighlight?: () => void;
}

export const FootnotePanel: React.FC<FootnotePanelProps> = ({
  groupedFootnotes,
  highlightedKey,
}) => {
  const { language, dict } = useLanguage();
  const [expandedTables, setExpandedTables] = useState<Record<string, boolean>>({});

  // Automatically expand the table containing the clicked/highlighted note
  useEffect(() => {
    if (!highlightedKey) return;
    const matchGroup = groupedFootnotes.find((g) =>
      g.notes.some((n) => n.key === highlightedKey)
    );
    if (matchGroup) {
      setExpandedTables((prev) => ({ ...prev, [matchGroup.tableId]: true }));
    }
  }, [highlightedKey, groupedFootnotes]);

  const toggleTable = (tableId: string) => {
    setExpandedTables((prev) => ({
      ...prev,
      [tableId]: !(prev[tableId] ?? true),
    }));
  };

  const setAllExpanded = (val: boolean) => {
    const next: Record<string, boolean> = {};
    for (const g of groupedFootnotes) {
      next[g.tableId] = val;
    }
    setExpandedTables(next);
  };

  const totalCount = groupedFootnotes.reduce((sum, g) => sum + g.notes.length, 0);

  if (groupedFootnotes.length === 0) {
    return null;
  }

  return (
    <section
      id="footnotes-register"
      className="bg-white border border-slate-200 rounded-lg overflow-hidden print:border-slate-300"
    >
      <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <BookOpen className="w-4 h-4 text-[#1e3a5f] shrink-0" />
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            {dict.tables.sectionHeaders.footnotesRegister}
          </h3>
          <span className="text-xs text-slate-500 tabular-nums">
            · {totalCount} {dict.tables.sectionHeaders.linkedFootnotesCount}
          </span>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            type="button"
            onClick={() => setAllExpanded(true)}
            className="text-xs font-medium text-[#1e3a5f] hover:underline cursor-pointer px-2 py-1"
          >
            {dict.core.expandAllNotes}
          </button>
          <span className="text-slate-300">|</span>
          <button
            type="button"
            onClick={() => setAllExpanded(false)}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 hover:underline cursor-pointer px-2 py-1"
          >
            {dict.core.collapseAllNotes}
          </button>
        </div>
      </div>

      <p className="px-5 py-2 text-xs text-slate-500 border-b border-slate-100 bg-white">
        {dict.glossary.originalOfficialTextNote}
      </p>

      <div className="divide-y divide-slate-200">
        {groupedFootnotes.map((group) => {
          const tableMeta = dict.tables.tables[group.tableId];
          const isOpen = expandedTables[group.tableId] ?? true;

          return (
            <div key={group.tableId} className="bg-white">
              <button
                type="button"
                onClick={() => toggleTable(group.tableId)}
                className="w-full px-5 py-3 flex items-center justify-between text-left hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                  <span className="text-xs font-semibold uppercase tracking-wide text-[#1e3a5f] shrink-0">
                    {tableMeta.shortTitle}
                  </span>
                  <span className="text-xs text-slate-600 truncate">
                    {tableMeta.fullTitle}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500 tabular-nums shrink-0 ml-3">
                  {group.notes.length}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-1 space-y-2.5">
                  {group.notes.map((note) => {
                    const isHighlighted = highlightedKey === note.key;
                    return (
                      <div
                        key={note.key}
                        id={`footnote-${note.key}`}
                        className={`rounded-md p-3 border text-xs leading-relaxed transition-colors ${
                          isHighlighted
                            ? 'bg-sky-50/90 border-[#1e3a5f] ring-1 ring-[#1e3a5f]/20'
                            : 'bg-slate-50/60 border-slate-200'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <Link2 className="w-3.5 h-3.5 text-[#1e3a5f] shrink-0" />
                          <span className="font-semibold text-slate-900 tabular-nums">
                            {note.scope === 'general'
                              ? `${language === 'fr' ? 'Note générale' : 'General Note'} ${note.noteNumber}`
                              : note.scope === 'appendix' && note.appendix
                              ? `App. ${note.appendix} — Note ${note.noteNumber}`
                              : note.scope === 'reference'
                              ? note.noteNumber
                              : `Note ${note.noteNumber}`}
                          </span>
                          {note.title && (
                            <span className="text-slate-600 font-medium">
                              · {note.title}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700 whitespace-pre-line">{note.text}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
