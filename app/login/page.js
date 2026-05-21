"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import LanguageSelector from "../components/LanguageSelector";
import { useLanguage } from "../context/LanguageContext";
import { findUser, setAuth } from "../../lib/auth";

export default function Login() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirect, setRedirect] = useState("/");

  useEffect(() => {
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
      setError(t.login.errorEmpty);
      return;
    }

    const user = findUser(normalizedEmail);
    if (!user) {
      setError(t.login.errorNotExists);
      return;
    }

    if (user.password !== password) {
      setError(t.login.errorPassword);
      return;
    }

    setAuth(user.email);
    router.push(redirect || "/");
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "var(--background)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
        <Logo />
        <LanguageSelector />
      </div>

      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ width: "100%", maxWidth: "400px", background: "white", padding: "32px 24px", borderRadius: "12px", boxShadow: "var(--shadow-lg)", border: "1px solid var(--border-light)" }}>
          <div style={{ marginBottom: "24px", display: "flex", justifyContent: "center" }}>
            <Logo />
          </div>

          <h2 style={{ fontSize: "1.75rem", fontWeight: 700, textAlign: "center", marginBottom: "32px", color: "var(--foreground)" }}>
            {t.login.title}
          </h2>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, marginBottom: "8px", color: "var(--text-secondary)" }}>
              {t.login.email}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "8px",
                border: "1px solid var(--border)",
                fontSize: "1rem",
                fontFamily: "inherit",
                boxSizing: "border-box",
                transition: "border-color 0.2s ease"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "block", fontSize: "0.9rem", fontWeight: 500, marginBottom: "8px", color: "var(--text-secondary)" }}>
              {t.login.password}
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  paddingRight: "44px",
                  borderRadius: "8px",
                  border: "1px solid var(--border)",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s ease"
                }}
                onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
                onBlur={(e) => e.target.style.borderColor = "var(--border)"}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                  color: "var(--text-tertiary)"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {error && (
            <div style={{ 
              marginBottom: "20px", 
              padding: "12px 14px",
              backgroundColor: "var(--error-light)",
              border: "1px solid var(--error)",
              color: "var(--error)",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: 500
            }}>
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px 16px",
              borderRadius: "8px",
              background: "var(--primary)",
              color: "white",
              border: "none",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.background = "var(--primary-dark)"}
            onMouseLeave={(e) => e.target.style.background = "var(--primary)"}
          >
            {t.login.submit}
          </button>

          {error && error.includes(t.login.errorNotExists.split(".")[0]) && (
            <button
              onClick={() => router.push(`/signup?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirect)}`)}
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "2px solid var(--primary)",
                background: "transparent",
                color: "var(--primary)",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "var(--primary)";
                e.target.style.color = "white";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "var(--primary)";
              }}
            >
              {t.signup.title}
            </button>
          )}

          <p style={{ textAlign: "center", fontSize: "0.9rem", marginTop: "20px", color: "var(--text-secondary)" }}>
            {t.login.noAccount}{' '}
            <Link href={`/signup?redirect=${encodeURIComponent(redirect)}`} style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid var(--primary)" }}>
              {t.login.createOne}
            </Link>
          </p>
        </div>
      </div>

      <footer style={{ 
        borderTop: "1px solid var(--border)", 
        background: "white", 
        padding: "20px", 
        textAlign: "center", 
        fontSize: "0.9rem",
        color: "var(--text-secondary)"
      }}>
        <p style={{ marginBottom: "8px" }}>{t.footer.company}</p>
        <p style={{ marginBottom: "4px" }}>{t.footer.email}</p>
        <p>{t.footer.contact}</p>
      </footer>
    </main>
  );
}
