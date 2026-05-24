"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, clearAuth } from "../../lib/auth";
import { getLanguage, t } from "../../lib/i18n";

export default function Dashboard() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("pt");

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.email) {
      router.push("/login");
    } else {
      setIsLogged(true);
    }
    setLanguage(getLanguage());
  }, [router]);
  const [jobs, setJobs] = useState([]);

  // Load jobs from localStorage when logged in
  useEffect(() => {
    if (isLogged) {
      const storedJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
      const defaultJobs = [
        { id: 1, title: "Recepcionista", location: "Maputo", salary: "8.000 MZN" },
        { id: 2, title: "Motorista", location: "Matola", salary: "10.000 MZN" },
        { id: 3, title: "Técnico de TI", location: "Beira", salary: "15.000 MZN" },
      ];
      setJobs([...defaultJobs, ...storedJobs]);
    }
  }, [isLogged]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!isLogged) return null;

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", padding: "20px", paddingBottom: "120px" }}>

      <div style={{ marginBottom: "30px", borderRadius: "16px", background: "white", padding: "24px", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)", border: "1px solid #dbeafe" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>👋 {t("welcomeTitle", language)}</h1>
        <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>Plataforma de empregos para você encontrar vagas, publicar oportunidades e manter seu perfil profissional atualizado.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", marginBottom: "30px" }}>
        <section style={{ borderRadius: "16px", background: "white", padding: "24px", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)", border: "1px solid #dbeafe" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px", color: "#1e293b" }}>🔍 {t("searchOpportunities", language)}</h2>
          <input
            type="text"
            placeholder="Buscar por cargo..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: "100%", borderRadius: "12px", border: "1px solid #cbd5e1", padding: "12px", marginBottom: "16px", fontSize: "14px", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredJobs.map((job) => (
              <div key={job.id} style={{ borderRadius: "12px", border: "1px solid #dbeafe", background: "#f0f9ff", padding: "16px", transition: "all 0.3s" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#2563eb";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#dbeafe";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              >
                <div style={{ marginBottom: "12px" }}>
                  <h3 style={{ fontWeight: "600", fontSize: "16px", color: "#1e293b", marginBottom: "4px" }}>{job.title}</h3>
                  <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "4px" }}>📍 {job.location}</p>
                  <p style={{ color: "#2563eb", fontWeight: "700", fontSize: "14px" }}>💰 {job.salary}</p>
                </div>
                <Link
                  href={`/jobs/${job.id}/apply`}
                  style={{ display: "block", width: "100%", borderRadius: "10px", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)", padding: "12px", color: "white", textAlign: "center", textDecoration: "none", fontWeight: "600", fontSize: "14px", border: "none", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 8px 16px rgba(16, 185, 129, 0.3)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  Candidatar-se
                </Link>
              </div>
            ))}
            {filteredJobs.length === 0 && (
              <p style={{ fontSize: "14px", color: "#64748b", textAlign: "center", padding: "20px" }}>Nenhuma vaga encontrada. Tente outra palavra-chave.</p>
            )}
          </div>
        </section>
      </div>

      <footer style={{ position: "fixed", bottom: "0", left: "0", right: "0", zIndex: "10", borderTop: "1px solid #e2e8f0", background: "white", padding: "12px 16px", boxShadow: "0 -4px 12px rgba(15, 23, 42, 0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-around", flex: 1, gap: "16px" }}>
            <Link href="/" style={{ fontSize: "24px", textDecoration: "none", transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>🏠</Link>
            <Link href="/post" style={{ fontSize: "24px", textDecoration: "none", color: "#64748b", transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>➕</Link>
            <Link href="/profile" style={{ fontSize: "24px", textDecoration: "none", color: "#64748b", transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"} title="Meu perfil">👤</Link>
          </div>
          <button
            onClick={() => {
              clearAuth();
              router.push("/");
            }}
            style={{ marginLeft: "16px", fontSize: "12px", color: "#ef4444", background: "none", border: "none", cursor: "pointer", fontWeight: "600", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#dc2626"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#ef4444"}
          >
            Sair
          </button>
        </div>
      </footer>

    </main>
  );

  if (!isLogged) return null;
}
