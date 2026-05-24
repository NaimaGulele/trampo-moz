"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { isAuthenticated } from "../../lib/auth";
import { getLanguage, setLanguage, languages, t } from "../../lib/i18n";

export default function Navbar({ showAuth = true }) {
  const [isLogged, setIsLogged] = useState(false);
  const [language, setLanguageState] = useState("pt");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  useEffect(() => {
    setIsLogged(isAuthenticated());
    setLanguageState(getLanguage());
  }, []);

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setLanguageState(lang);
    setShowLanguageMenu(false);
    window.location.reload();
  };

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white shadow-sm border-b border-gray-200">
      <Logo />

      <div className="flex items-center gap-3 ml-auto">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 transition text-sm font-semibold text-gray-700 hover:text-blue-600"
            aria-label="Select language"
            title="Click to change language"
          >
            <span className="text-lg">{languages[language]?.flag}</span>
            <span className="hidden sm:inline">{languages[language]?.name}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          
          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-xl shadow-xl z-50 overflow-hidden">
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`w-full text-left px-4 py-3 flex items-center gap-3 transition font-medium ${
                    language === code
                      ? "bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-l-4 border-blue-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-lg">{flag}</span>
                  <span>{name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Auth Button - Only show on home/public pages when not logged in */}
        {showAuth && !isLogged && (
          <Link
            href="/signup"
            className="rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2 text-white transition hover:shadow-lg hover:from-blue-700 hover:to-blue-800 font-semibold text-sm"
          >
            {t("signup", language)}
          </Link>
        )}
      </div>
    </nav>
  );
}
