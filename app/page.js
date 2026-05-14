"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";
import { isAuthenticated } from "../lib/auth";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    setIsLogged(isAuthenticated());
  }, []);

  return (
    <div style={{ fontFamily: "Arial" }}>
      <Navbar />

      <main style={{ padding: "20px", maxWidth: "860px", margin: "0 auto" }}>
        <section style={{ marginBottom: "30px" }}>
          <h1 style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)", lineHeight: "1.1", marginBottom: "18px" }}>
            Bem-vindo ao Trampo Moz
          </h1>
          <p style={{ fontSize: "clamp(0.95rem, 4vw, 1.1rem)", color: "#444", marginBottom: "24px", lineHeight: "1.6" }}>
            Encontre vagas em Moçambique, publique oportunidades e gerencie o seu perfil profissional em um só lugar.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", flexDirection: "column" }}>
            {isLogged ? (
              <Link
                href="/dashboard"
                style={{ background: "#2563eb", color: "white", padding: "12px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, textAlign: "center", display: "block" }}
              >
                Ir para o painel
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  style={{ background: "#2563eb", color: "white", padding: "12px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, textAlign: "center", display: "block" }}
                >
                  Entrar
                </Link>
                <Link
                  href="/signup"
                  style={{ background: "#f3f4f6", color: "#111827", padding: "12px 20px", borderRadius: "12px", textDecoration: "none", fontWeight: 600, textAlign: "center", display: "block" }}
                >
                  Criar conta
                </Link>
              </>
            )}
          </div>
        </section>

        <section style={{ display: "grid", gap: "16px", gridTemplateColumns: "1fr" }}>
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
            <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", marginBottom: "12px" }}>🔍 Procurar oportunidades</h2>
            <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: "1.5" }}>
              Veja vagas disponíveis, encontre a posição certa e candidate-se de forma rápida e segura.
            </p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
            <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", marginBottom: "12px" }}>➕ Publicar vaga</h2>
            <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: "1.5" }}>
              Se você é recrutador, publique a sua vaga e alcance candidatos qualificados imediatamente.
            </p>
          </div>
          <div style={{ background: "#ffffff", borderRadius: "16px", padding: "18px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)" }}>
            <h2 style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)", marginBottom: "12px" }}>👤 Perfil completo</h2>
            <p style={{ color: "#4b5563", fontSize: "0.95rem", lineHeight: "1.5" }}>
              Mantenha seu perfil atualizado e agilize o processo de candidatura para as vagas.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
