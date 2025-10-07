'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { translations, Locale, TranslationKey } from '../translations';

interface TranslationContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load locale from localStorage on mount (client-side only)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'ja')) {
        setLocaleState(savedLocale);
      }
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey) => {
      return translations[locale][key] || key;
    },
    [locale]
  );

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
