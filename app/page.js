"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "../lib/auth";
import { LanguageContext } from "./components/LanguageProvider";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  return (
    <div style={{ fontFamily: "Arial" }}>
      <Navbar />

      <main style={{ padding: "20px", maxWidth: "860px", margin: "0 auto" }}>
        <section style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", lineHeight: "1.1", marginBottom: "18px" }}>
            {t('home.welcome')}
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 4vw, 1.1rem)", color: "#444", marginBottom: "24px", lineHeight: "1.6" }}>
            {t('home.description')}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", flexDirection: "column" }}>
            {isLogged ? (
              <Link
                href="/dashboard"
                style={{ background: "var(--primary)", color: "white", padding: "12px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, textAlign: "center", display: "block" }}
              >
                {t('home.cta.dashboard')}
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{ background: "var(--primary)", color: "white", padding: "12px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, textAlign: "center", display: "block" }}
                >
                  {t('home.cta.login')}
                </Link>
                <Link
                  href="/signup"
                  style={{ background: "var(--background)", color: "var(--foreground)", padding: "12px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, textAlign: "center", display: "block", border: "1px solid var(--border)" }}
                >
                  {t('home.cta.signup')}
                </Link>
              </>
            )}
          </div>
        </section>

        <section style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
            <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", marginBottom: "12px" }}>{t('features.search_title')}</h2>
            <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: "1.5" }}>{t('features.search_desc')}</p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
            <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", marginBottom: "12px" }}>{t('features.post_title')}</h2>
            <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: "1.5" }}>{t('features.post_desc')}</p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
            <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", marginBottom: "12px" }}>{t('features.profile_title')}</h2>
            <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: "1.5" }}>{t('features.profile_desc')}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
