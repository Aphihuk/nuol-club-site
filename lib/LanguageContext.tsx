"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { content, type Dictionary, type Lang } from "./content";

interface LanguageContextValue {
  lang: Lang;
  t: Dictionary;
  toggle: () => void;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "nuol-club-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  // Restore persisted preference on mount
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "lo") {
      setLangState(saved);
    }
  }, []);

  // Keep <html lang> and persistence in sync
  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((prev) => (prev === "en" ? "lo" : "en")),
    []
  );

  return (
    <LanguageContext.Provider value={{ lang, t: content[lang], toggle, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
