import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { Language } from '../types/mol';
import { getDictionaries, type AppDictionaries } from '../i18n';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  dict: AppDictionaries;
}

const STORAGE_KEY = 'mol_piesmr_lang';

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'fr' || saved === 'en') return saved;
    } catch {
      // ignore storage errors
    }
    return 'fr';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => setLanguage(language === 'fr' ? 'en' : 'fr');

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const dict = useMemo(() => getDictionaries(language), [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, dict }),
    [language, dict]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
