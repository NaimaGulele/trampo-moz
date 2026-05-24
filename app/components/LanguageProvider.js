"use client";
import { createContext, useEffect, useState } from "react";
import { translations, availableLocales } from "../i18n/translations";

export const LanguageContext = createContext({
  locale: "pt",
  setLocale: () => {},
  t: (k) => k,
  locales: availableLocales,
});

export default function LanguageProvider({ children }) {
  const [locale, setLocale] = useState("pt");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("tmz_lang");
      if (stored && translations[stored]) setLocale(stored);
    } catch (e) {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tmz_lang", locale);
    } catch (e) {}
  }, [locale]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const lang = locale === "pt" ? "pt-MZ" : locale === "en" ? "en" : "ts-MZ";
      document.documentElement.lang = lang;
    }
  }, [locale]);

  const t = (keyPath, fallback) => {
    if (!keyPath) return fallback || "";
    const parts = keyPath.split(".");
    let node = translations[locale] || {};
    for (const p of parts) {
      if (node && Object.prototype.hasOwnProperty.call(node, p)) {
        node = node[p];
      } else {
        node = undefined;
        break;
      }
    }
    return node ?? fallback ?? keyPath;
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, locales: availableLocales }}>
      {children}
    </LanguageContext.Provider>
  );
}
