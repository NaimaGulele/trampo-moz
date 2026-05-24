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

      <div className="flex items-center gap-2 ml-auto">
        {/* Language Selector */}
        <div className="relative">
          <button
            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition text-sm font-medium text-gray-700"
            aria-label="Select language"
          >
            {languages[language]?.flag} {languages[language]?.name}
          </button>
          
          {showLanguageMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 transition ${
                    language === code
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{flag}</span> {name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Auth Links - Only show on home/public pages when not logged in */}
        {showAuth && !isLogged && (
          <div className="flex items-center gap-2">
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-blue-600 transition font-medium text-sm"
            >
              {t("enter", language)}
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 font-medium text-sm"
            >
              {t("signup", language)}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
