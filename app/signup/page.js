"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import Logo from "../components/Logo";
import { findUser, saveUser, saveProfile, setAuth } from "../../lib/auth";
import { LanguageContext } from "../components/LanguageProvider";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useContext(LanguageContext);
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState("/");
  const [step, setStep] = useState("form"); // "form" | "otp"
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const prefillEmail = params.get("email");
      const nextPath = params.get("redirect");
      if (prefillEmail) setEmail(prefillEmail.toLowerCase());
      if (nextPath) setRedirect(nextPath);
    }
  }, []);

  const handleSignup = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!name || !normalizedEmail || !password) {
      setError(t('signup.fill_error'));
      return;
    }

    const existingUser = findUser(normalizedEmail);
    if (existingUser) {
      setError(t('signup.exists'));
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/send-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, name }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao enviar código.');
        setLoading(false);
        return;
      }

      setStep("otp");
    } catch (err) {
      setError('Erro de ligação.');
    }
    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setError('Introduza o código de 6 dígitos.');
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), code: otp }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Código inválido.');
        setLoading(false);
        return;
      }

      // OTP verified — create account
      const normalizedEmail = email.trim().toLowerCase();
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
      setAuth(normalizedEmail);
      router.push(redirect || "/");
    } catch (err) {
      setError('Erro de ligação.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-lg">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>

          {step === "form" && (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">{t('signup.title')}</h2>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('signup.name_placeholder') ?? 'Nome completo'}
                className="w-full mb-3 rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('signup.email_placeholder') ?? 'Email'}
                className="w-full mb-1 rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mb-3">{t('signup.email_notice') ?? 'Use seu email real, ele será usado nas candidaturas e para recuperar seu acesso.'}</p>

              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('signup.password_placeholder') ?? 'Senha'}
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
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 py-3 text-white transition hover:bg-blue-700 font-semibold disabled:opacity-50"
              >
                {loading ? 'A enviar código...' : t('signup.title')}
              </button>

              <p className="text-center text-sm mt-4 text-gray-600">
                {t('signup.have_account')}{' '}
                <Link href={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-600 hover:underline">
                  {t('login.title')}
                </Link>
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="text-2xl font-bold text-center mb-2">Verificar Email</h2>
              <p className="text-center text-sm text-gray-600 mb-2">Enviámos um código para:</p>
              <p className="text-center text-blue-600 font-semibold mb-6">{email}</p>

              <input
                type="text"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full mb-4 rounded-2xl border border-gray-300 p-3 text-center text-3xl font-bold tracking-widest focus:border-blue-500 focus:outline-none"
              />

              {error && <p className="mb-4 text-sm text-red-600 font-semibold bg-red-50 p-3 rounded-lg">{error}</p>}

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 py-3 text-white transition hover:bg-blue-700 font-semibold disabled:opacity-50"
              >
                {loading ? 'A verificar...' : 'Confirmar e criar conta'}
              </button>

              <button
                onClick={() => { setStep("form"); setOtp(""); setError(""); }}
                className="w-full mt-3 rounded-2xl border border-gray-300 py-3 text-gray-600 transition hover:bg-gray-50 font-semibold"
              >
                ← Voltar
              </button>
            </>
          )}
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-600">
        <p className="mb-2">{t('footer.about')}</p>
        <p>Email: {t('footer.contact_email')}</p>
        <p>Contacto: +258 84 000 000 000</p>
      </footer>
    </main>
  );
}
