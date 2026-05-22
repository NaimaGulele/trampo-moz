"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import LanguageSelector from "./LanguageSelector";
import { isAuthenticated } from "../../lib/auth";

export default function Navbar({ showAuth = true }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 20px",
      background: "white",
      borderBottom: "1px solid var(--border)",
      boxShadow: "var(--shadow-sm)"
    }}>
      <Logo />
      <LanguageSelector />
    </nav>
  );
}
