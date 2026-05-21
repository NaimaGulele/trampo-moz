"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { useLanguage } from "./context/LanguageContext";
import { isAuthenticated } from "../lib/auth";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "var(--background)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, padding: "20px", maxWidth: "900px", margin: "0 auto", width: "100%" }}>
        {/* Hero Section */}
        <section style={{ marginBottom: "50px", textAlign: "center", paddingTop: "40px" }}>
          <h1 style={{ 
            fontSize: "clamp(2rem, 6vw, 3.5rem)", 
            lineHeight: "1.2", 
            marginBottom: "20px",
            color: "var(--foreground)",
            fontWeight: 700
          }}>
            {t.home.welcome}
          </h1>
          <p style={{ 
            fontSize: "clamp(1rem, 4vw, 1.25rem)", 
            color: "var(--text-secondary)", 
            marginBottom: "32px", 
            lineHeight: "1.6",
            maxWidth: "600px",
            margin: "0 auto 32px"
          }}>
            {t.home.subtitle}
          </p>
          
          {!isLogged && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "300px", margin: "0 auto" }}>
              <Link
                href="/login"
                style={{ 
                  background: "var(--primary)", 
                  color: "white", 
                  padding: "14px 28px", 
                  borderRadius: "8px", 
                  textDecoration: "none", 
                  fontWeight: 600, 
                  textAlign: "center", 
                  display: "block",
                  transition: "background 0.2s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => e.target.style.background = "var(--primary-dark)"}
                onMouseLeave={(e) => e.target.style.background = "var(--primary)"}
              >
                {t.home.enterLogin}
              </Link>
              <Link
                href="/signup"
                style={{ 
                  background: "var(--background-alt)", 
                  color: "var(--primary)", 
                  padding: "14px 28px", 
                  borderRadius: "8px", 
                  textDecoration: "none", 
                  fontWeight: 600, 
                  textAlign: "center", 
                  display: "block",
                  border: "2px solid var(--primary)",
                  transition: "all 0.2s ease",
                  cursor: "pointer"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "var(--primary-light)";
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "var(--background-alt)";
                  e.target.style.color = "var(--primary)";
                }}
              >
                {t.home.createAccount}
              </Link>
            </div>
          )}
        </section>

        {/* Features Section */}
        <section style={{ display: "grid", gap: "20px", gridTemplateColumns: "1fr" }}>
          <FeatureCard 
            icon="🔍"
            title={t.home.searchJobs}
            description={t.home.searchJobsDesc}
          />
          <FeatureCard 
            icon="➕"
            title={t.home.postJob}
            description={t.home.postJobDesc}
          />
          <FeatureCard 
            icon="👤"
            title={t.home.completeProfile}
            description={t.home.completeProfileDesc}
          />
        </section>
      </main>

      {/* Footer */}
      <footer style={{ 
        borderTop: "1px solid var(--border)", 
        background: "white", 
        padding: "30px 20px", 
        textAlign: "center", 
        fontSize: "0.95rem",
        color: "var(--text-secondary)",
        marginTop: "50px"
      }}>
        <p style={{ marginBottom: "10px" }}>{t.footer.company}</p>
        <p style={{ marginBottom: "8px" }}>{t.footer.email}</p>
        <p>{t.footer.contact}</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div style={{ 
      background: "white", 
      borderRadius: "12px", 
      padding: "24px", 
      boxShadow: "var(--shadow-md)",
      border: "1px solid var(--border-light)",
      transition: "all 0.3s ease",
      cursor: "pointer"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "var(--shadow-lg)";
      e.currentTarget.style.transform = "translateY(-4px)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "var(--shadow-md)";
      e.currentTarget.style.transform = "translateY(0)";
    }}
    >
      <h2 style={{ 
        fontSize: "clamp(1.1rem, 4vw, 1.35rem)", 
        marginBottom: "12px",
        color: "var(--foreground)",
        fontWeight: 600
      }}>
        {icon} {title}
      </h2>
      <p style={{ 
        color: "var(--text-secondary)", 
        fontSize: "0.95rem", 
        lineHeight: "1.6",
        margin: 0
      }}>
        {description}
      </p>
    </div>
  );
}
