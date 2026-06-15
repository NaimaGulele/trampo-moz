"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import Logo from "../components/Logo";
import { findUser, setAuth } from "../../lib/auth";
import { LanguageContext } from "../components/LanguageProvider";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { t } = useContext(LanguageContext);
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState("/");
  const [step, setStep] = useState("login"); // "login" | "otp"
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const nextPath = params.get("redirect");
      if (nextPath) setRedirect(nextPath);
    }
  }, []);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail || !password) {
      setError(t('login.fill_error'));
      return;
    }

    const user = findUser(normalizedEmail);
    if (!user) {
      setError(t('login.no_user'));
      return;
    }

    if (user.password !== password) {
      setError(t('login.bad_password'));
      return;
    }

    // Credentials correct — send OTP
    setLoading(true);
    setError("");
    setPendingUser(user);

    try {
      const res = await fetch('/api/send-login-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail, name: user.name || normalizedEmail }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Erro ao enviar OTP.');
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

      // OTP verified — complete login
      setAuth(pendingUser.email);
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

          {step === "login" && (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">{t('login.title')}</h2>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('signup.email_placeholder') ?? 'Email'}
                className="w-full mb-3 rounded-2xl border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
              />

              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('login.password_placeholder') ?? 'Senha'}
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
                disabled={loading}
                className="w-full rounded-2xl bg-blue-600 py-3 text-white transition hover:bg-blue-700 font-semibold disabled:opacity-50"
              >
                {loading ? 'A verificar...' : t('login.title')}
              </button>

              {error && error.includes(t('login.no_user')) && (
                <button
                  onClick={() => router.push(`/signup?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirect)}`)}
                  className="w-full mt-3 rounded-2xl border border-blue-600 py-3 text-blue-600 transition hover:bg-blue-50 font-semibold"
                >
                  {t('signup.title')}
                </button>
              )}

              <p className="text-center text-sm mt-4 text-gray-600">
                {t('login.no_account')}{' '}
                <Link href={`/signup?redirect=${encodeURIComponent(redirect)}`} className="text-blue-600 hover:underline">
                  {t('signup.title')}
                </Link>
              </p>
            </>
          )}

          {step === "otp" && (
            <>
              <h2 className="text-2xl font-bold text-center mb-2">Verificação</h2>
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
                {loading ? 'A verificar...' : 'Confirmar código'}
              </button>

              <button
                onClick={() => { setStep("login"); setOtp(""); setError(""); }}
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
