"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { findUser, saveUser, saveProfile, setAuth } from "../../lib/auth";
import { getLanguage, t } from "../../lib/i18n";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState("/");
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    setLanguage(getLanguage());
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const prefillEmail = params.get("email");
      const nextPath = params.get("redirect");
      if (prefillEmail) {
        setEmail(prefillEmail.toLowerCase());
      }
      if (nextPath) {
        setRedirect(nextPath);
      }
    }
  }, []);

  const handleSignup = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name || !normalizedEmail || !password) {
      setError(t("fillAllFields", language));
      return;
    }

    const existingUser = findUser(normalizedEmail);
    if (existingUser) {
      setError(t("emailExists", language));
      return;
    }

    saveUser({ name, email: normalizedEmail, password });
    saveProfile(normalizedEmail, {
      fullName: name,
      contact: "",
      address: "",
      title: "",
      summary: "",
      experience: "",
      cvFileName: "",
    });
    setAuth(normalizedEmail, name);
    router.push(redirect || "/");
  };

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" }}>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl" style={{ boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)" }}>
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">{t("signupTitle", language)}</h2>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("fullName", language)}
            className="w-full mb-3 rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email", language)}
            className="w-full mb-1 rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          />
          <p className="text-xs text-gray-500 mb-3">{language === "pt" ? "Use seu email real, ele será usado nas candidaturas e para recuperar seu acesso." : language === "en" ? "Use your real email, it will be used in applications and to recover your access." : "Mamuyisela email ya wena ya kuphela, i-mameli ku mameyano na ku kubuya ku wena."}</p>

          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("password", language)}
              className="w-full rounded-2xl border border-gray-300 p-3 pr-12 focus:border-blue-500 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <p className="mb-4 text-sm text-red-600 font-semibold bg-red-50 p-3 rounded-lg">{error}</p>}

          <button
            onClick={handleSignup}
            className="w-full rounded-xl py-3 text-white transition font-semibold text-lg"
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 99, 235, 0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {t("signupButton", language)}
          </button>

          <p className="text-center text-sm mt-4 text-gray-600">
            {t("hasAccount", language)}{' '}
            <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-600 hover:underline">
              {t("enter", language)}
            </Link>
          </p>
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-600">
        <p className="mb-2">Trampo Moz - Encontre emprego em Moçambique</p>
        <p>Email: suporte@trampomoz.co.mz</p>
        <p>Contacto: +258 84 000 0000</p>
      </footer>
    </main>
  );
}
