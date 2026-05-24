"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { isAuthenticated } from "../../lib/auth";

export default function Navbar({ showAuth = false }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white shadow-sm" aria-label="Main navigation">
      <Logo />

      <div className="ml-auto flex items-center gap-3">
        <LanguageSwitcher />
      </div>
    </nav>
  );
}
