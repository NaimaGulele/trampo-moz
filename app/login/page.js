"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { findUser, setAuth } from "../../lib/auth";
import { getLanguage, t } from "../../lib/i18n";

export default function Login() {
  const router = useRouter();
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
      const nextPath = params.get("redirect");
      if (nextPath) {
        setRedirect(nextPath);
      }
    }
  }, []);

  const handleLogin = () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError(t("fillFields", language));
      return;
    }

    const user = findUser(normalizedEmail);
    if (!user) {
      setError(t("userNotFound", language));
      return;
    }

    if (user.password !== password) {
      setError(t("wrongPassword", language));
      return;
    }

    setAuth(user.email, user.name);
    router.push(redirect || "/");
  };

  return (
    <main className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" }}>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-8 rounded-2xl" style={{ boxShadow: "0 20px 40px rgba(15, 23, 42, 0.15)" }}>
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">{t("loginTitle", language)}</h2>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("email", language)}
            className="w-full mb-3 rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
          />

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
            onClick={handleLogin}
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
            {t("loginButton", language)}
          </button>

          {error && error.includes(t("userNotFound", language)) && (
            <button
              onClick={() => router.push(`/signup?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirect)}`)}
              className="w-full mt-3 rounded-xl py-3 font-semibold text-lg transition"
              style={{ border: "2px solid #2563eb", color: "#2563eb", background: "#dbeafe" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#bfdbfe";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#dbeafe";
              }}
            >
              {t("signup", language)}
            </button>
          )}

          <p className="text-center text-sm mt-4 text-gray-600">
            {t("noAccount", language)}{' '}
            <Link href={`/signup?redirect=${encodeURIComponent(redirect)}`} className="text-blue-600 hover:underline">
              {t("signup", language)}
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
