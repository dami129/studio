"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useProfile } from './use-profile';
import en from '@/locales/en.json';
import si from '@/locales/si.json';
import ta from '@/locales/ta.json';

type Language = 'English' | 'Sinhala' | 'Tamil';

type Translations = {
  [key: string]: string | { [key: string]: string };
};

const translations: { [key in Language]: Translations } = {
  English: en,
  Sinhala: si,
  Tamil: ta,
};

interface LanguageContextType {
  language: Language;
  t: (key: string, options?: { [key: string]: string | number }) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useProfile();
  const [language, setLanguage] = useState<Language>(user.language as Language || 'English');
  const [loadedTranslations, setLoadedTranslations] = useState<Translations>(translations[language]);

  useEffect(() => {
    const newLang = (user.language as Language) || 'English';
    setLanguage(newLang);
    setLoadedTranslations(translations[newLang]);
    
    // Set the lang attribute on the html tag
    document.documentElement.lang = newLang.substring(0, 2).toLowerCase();
    
  }, [user.language]);

  const t = useCallback((key: string, options?: { [key: string]: string | number }) => {
    const keys = key.split('.');
    let text = loadedTranslations;

    for (const k of keys) {
      if (typeof text === 'object' && text !== null && k in text) {
        text = text[k] as Translations;
      } else {
        return key;
      }
    }

    if (typeof text !== 'string') {
      return key;
    }

    if (options) {
      return Object.entries(options).reduce((str, [k, v]) => {
        return str.replace(`{{${k}}}`, String(v));
      }, text);
    }
    
    return text;
  }, [loadedTranslations]);


  return (
    <LanguageContext.Provider value={{ language, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
