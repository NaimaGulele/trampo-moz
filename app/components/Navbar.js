"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import { isAuthenticated } from "../../lib/auth";

export default function Navbar({ showAuth = true }) {
  const [isLogged, setIsLogged] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white shadow-sm border-b border-[var(--border)]">
      <Logo />

      <div className="flex items-center gap-4">
        {showAuth && !isLogged ? (
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link href="/login" className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors font-medium">
              {t.nav.login}
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-[var(--primary)] px-4 py-2 text-white transition hover:bg-[var(--primary-dark)]"
            >
              {t.nav.signup}
            </Link>
          </div>
        ) : (
          <div />
        )}
        <LanguageSelector />
      </div>
    </nav>
  );
}
