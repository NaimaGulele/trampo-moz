"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { isAuthenticated } from "../../lib/auth";

export default function Navbar({ showAuth = true }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  return (
    <nav className="flex flex-wrap items-center justify-between gap-3 p-4 bg-white shadow-sm">
      <Logo />

      {showAuth && !isLogged ? (
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Entrar
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Criar conta
          </Link>
        </div>
      ) : (
        <div />
      )}
    </nav>
  );
}
