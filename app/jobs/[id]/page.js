"use client";

import Link from "next/link";
import InteractiveLink from "../../components/InteractiveLink";
import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function JobDetails({ params }) {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px"
      }}>
        <InteractiveLink href="/jobs" style={{
          display: "inline-block",
          marginBottom: "30px",
          color: "#0070f3",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "15px",
          transition: "color 0.2s ease"
        }}
        onMouseEnter={(e) => e.target.style.color = "#0051cc"}
        onMouseLeave={(e) => e.target.style.color = "#0070f3"}
        >
          ← Voltar aos Empregos
        </InteractiveLink>

        <div style={{
          background: "white",
          padding: "40px 24px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: "30px",
            paddingBottom: "30px",
            borderBottom: "1px solid #eee",
            flexWrap: "wrap",
            gap: "16px"
          }}>
            <div style={{flex: 1, minWidth: "200px"}}>
              <h1 style={{
                fontSize: "clamp(24px, 6vw, 32px)",
                color: "#222",
                marginBottom: "10px"
              }}>
                Detalhes da Vaga
              </h1>
              <p style={{
                color: "#666",
                fontSize: "14px",
                margin: "0"
              }}>
                ID: {params.id}
              </p>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              style={{
                padding: "10px 16px",
                background: saved ? "#10b981" : "#f0f0f0",
                color: saved ? "white" : "#666",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => {
                if (!saved) e.target.style.background = "#e0e0e0";
              }}
              onMouseLeave={(e) => {
                if (!saved) e.target.style.background = "#f0f0f0";
              }}
              aria-label={saved ? "Vaga salva" : "Salvar vaga"}
            >
              {saved ? "✓ Salvo" : "Salvar"}
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "16px",
            marginBottom: "30px"
          }}>
            <div>
              <p style={{
                color: "#999",
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: "5px"
              }}>
                Tipo de Contrato
              </p>
              <p style={{
                color: "#222",
                fontSize: "16px",
                margin: "0"
              }}>
                Integral
              </p>
            </div>
            <div>
              <p style={{
                color: "#999",
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: "5px"
              }}>
                Salário
              </p>
              <p style={{
                color: "#0070f3",
                fontSize: "16px",
                margin: "0",
                fontWeight: "bold"
              }}>
                Em MZN 💰
              </p>
            </div>
            <div>
              <p style={{
                color: "#999",
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: "5px"
              }}>
                ID da Vaga
              </p>
              <p style={{
                color: "#222",
                fontSize: "14px",
                margin: "0",
                fontFamily: "monospace",
                wordBreak: "break-all"
              }}>
                {params.id}
              </p>
            </div>
          </div>

          <p style={{
            padding: "16px",
            background: "#f0f7ff",
            border: "2px solid #d0e8ff",
            borderRadius: "6px",
            color: "#0070f3",
            fontSize: "14px",
            margin: "20px 0",
            lineHeight: "1.5"
          }}>
            ℹ️ Esta é uma vaga de demonstração. Os detalhes completos serão exibidos quando conectado a um banco de dados.
          </p>

          <div style={{ marginTop: "30px" }}>
            <button 
              aria-label="Candidatar-se para esta vaga"
              style={{
                width: "100%",
                padding: "16px",
                background: "#0070f3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "background 0.2s ease"
              }}
              onMouseEnter={(e) => e.target.style.background = "#0051cc"}
              onMouseLeave={(e) => e.target.style.background = "#0070f3"}
            >
              Candidatar-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
