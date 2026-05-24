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
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)" }}>
      <Navbar />

      <main style={{ padding: "60px 20px", maxWidth: "1100px", margin: "0 auto" }}>
        {/* Hero Section */}
        <section style={{ marginBottom: "70px", textAlign: "center" }}>
          <h1 style={{ 
            fontSize: "clamp(2.5rem, 7vw, 3.5rem)", 
            lineHeight: "1.1", 
            marginBottom: "24px",
            background: "linear-gradient(135deg, #1d4ed8 0%, #0891b2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 800
          }}>
            {t("welcomeTitle", language)}
          </h1>
          <p style={{ 
            fontSize: "clamp(1.1rem, 4vw, 1.3rem)", 
            color: "#475569", 
            marginBottom: "40px", 
            lineHeight: "1.8",
            maxWidth: "700px",
            margin: "0 auto 40px",
            fontWeight: 500
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
            borderRadius: "12px", 
            padding: "32px", 
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)",
            border: "1px solid #dbeafe",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(37, 99, 235, 0.2)";
            e.currentTarget.style.borderColor = "#2563eb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.1)";
            e.currentTarget.style.borderColor = "#dbeafe";
          }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#1e293b", fontWeight: 700 }}>
              🔍 {t("searchOpportunities", language)}
            </h2>
            <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.7" }}>
              {t("searchDesc", language)}
            </p>
          </div>
          
          <div style={{ 
            background: "#ffffff", 
            borderRadius: "12px", 
            padding: "32px", 
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)",
            border: "1px solid #dbeafe",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(6, 182, 212, 0.2)";
            e.currentTarget.style.borderColor = "#06b6d4";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.1)";
            e.currentTarget.style.borderColor = "#dbeafe";
          }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#1e293b", fontWeight: 700 }}>
              ➕ {t("publishJob", language)}
            </h2>
            <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.7" }}>
              {t("publishDesc", language)}
            </p>
          </div>
          
          <div style={{ 
            background: "#ffffff", 
            borderRadius: "12px", 
            padding: "32px", 
            boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)",
            border: "1px solid #dbeafe",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-8px)";
            e.currentTarget.style.boxShadow = "0 12px 24px rgba(16, 185, 129, 0.2)";
            e.currentTarget.style.borderColor = "#10b981";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(15, 23, 42, 0.1)";
            e.currentTarget.style.borderColor = "#dbeafe";
          }}
          >
            <h2 style={{ fontSize: "1.5rem", marginBottom: "16px", color: "#1e293b", fontWeight: 700 }}>
              👤 {t("completeProfile", language)}
            </h2>
            <p style={{ color: "#64748b", fontSize: "1rem", lineHeight: "1.7" }}>
              {t("profileDesc", language)}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
