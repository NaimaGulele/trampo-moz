"use client";
import { useContext } from "react";
import { LanguageContext } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, setLocale, locales } = useContext(LanguageContext);

  return (
    <div className="language-switcher">
      <label htmlFor="lang-select" className="sr-only">Language</label>
      <select
        id="lang-select"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
        className="rounded-md border px-2 py-1 text-sm"
        aria-label="Select language"
      >
        {locales.map((l) => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
