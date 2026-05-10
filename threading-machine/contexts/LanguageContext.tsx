"use client";

import { createContext, useContext, useState } from "react";
import { translations, type Lang, type T } from "@/lib/i18n";
// T is now derived from the `en` const — th satisfies the same shape

type ContextValue = { lang: Lang; setLang: (l: Lang) => void; t: T };

const LanguageContext = createContext<ContextValue>({
  lang: "th",
  setLang: () => {},
  t: translations.th,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("th");
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as T }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
