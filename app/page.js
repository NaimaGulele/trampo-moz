"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "../lib/auth";
import { getLanguage, t } from "../lib/i18n";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    setIsLogged(isAuthenticated());
    setLanguage(getLanguage());
  }, []);

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" }}>
      <Navbar />

      <main style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto" }}>
        {/* Hero Section */}
        <section style={{ marginBottom: "50px", textAlign: "center" }}>
          <h1 style={{ 
            fontSize: "clamp(2rem, 6vw, 3rem)", 
            lineHeight: "1.2", 
            marginBottom: "20px",
            color: "#1f2937",
            fontWeight: 700
          }}>
            {t("welcomeTitle", language)}
          </h1>
          <p style={{ 
            fontSize: "clamp(1rem, 4vw, 1.2rem)", 
            color: "#6b7280", 
            marginBottom: "32px", 
            lineHeight: "1.7",
            maxWidth: "600px",
            margin: "0 auto 32px"
          }}>
            {t("welcomeDesc", language)}
          </p>
          
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            {isLogged ? (
              <Link
                href="/dashboard"
                style={{ 
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", 
                  color: "white", 
                  padding: "14px 32px", 
                  borderRadius: "10px", 
                  textDecoration: "none", 
                  fontWeight: 600, 
                  textAlign: "center", 
                  display: "inline-block",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
                  border: "none",
                  cursor: "pointer"
                }}
              >
                {t("goToDashboard", language)}
              </Link>
            ) : (
              <Link
                href="/login"
                style={{ 
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", 
                  color: "white", 
                  padding: "14px 32px", 
                  borderRadius: "10px", 
                  textDecoration: "none", 
                  fontWeight: 600, 
                  textAlign: "center", 
                  display: "inline-block",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
                }}
              >
                {t("enter", language)}
              </Link>
            )}
          </div>
        </section>

        {/* Features Grid */}
        <section style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div style={{ 
            background: "#ffffff", 
            borderRadius: "16px", 
            padding: "28px", 
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e5e7eb",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.08)";
          }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#1f2937", fontWeight: 600 }}>
              🔍 {t("searchOpportunities", language)}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>
              {t("searchDesc", language)}
            </p>
          </div>
          
          <div style={{ 
            background: "#ffffff", 
            borderRadius: "16px", 
            padding: "28px", 
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e5e7eb",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.08)";
          }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#1f2937", fontWeight: 600 }}>
              ➕ {t("publishJob", language)}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>
              {t("publishDesc", language)}
            </p>
          </div>
          
          <div style={{ 
            background: "#ffffff", 
            borderRadius: "16px", 
            padding: "28px", 
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
            border: "1px solid #e5e7eb",
            transition: "transform 0.2s, box-shadow 0.2s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.12)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.08)";
          }}
          >
            <h2 style={{ fontSize: "1.25rem", marginBottom: "12px", color: "#1f2937", fontWeight: 600 }}>
              👤 {t("completeProfile", language)}
            </h2>
            <p style={{ color: "#6b7280", fontSize: "0.95rem", lineHeight: "1.6" }}>
              {t("profileDesc", language)}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
