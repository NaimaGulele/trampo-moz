"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { getAuth } from "../../lib/auth";
import { getLanguage, t } from "../../lib/i18n";

export default function PostJob() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [language, setLanguage] = useState("pt");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.email) {
      router.push("/login");
    } else {
      setIsLogged(true);
    }
    setLanguage(getLanguage());
  }, [router]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !location || !salary || !description) {
      setError("Preencha todos os campos antes de publicar.");
      return;
    }

    setError("");

    const existingJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    const newJob = {
      id: Date.now(),
      title,
      location,
      salary,
      description,
      createdAt: new Date().toISOString()
    };
    existingJobs.push(newJob);
    localStorage.setItem("postedJobs", JSON.stringify(existingJobs));

    setTitle("");
    setLocation("");
    setSalary("");
    setDescription("");
    router.push("/dashboard");
  };

  if (!isLogged) return null;

  return (
    <div style={{ background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "32px 16px", maxWidth: "720px", margin: "0 auto", paddingBottom: "40px" }}>
        <Link
          href="/dashboard"
          style={{ display: "inline-flex", alignItems: "center", color: "#2563eb", marginBottom: "24px", textDecoration: "none", fontSize: "14px", fontWeight: "600", transition: "color 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.color = "#1d4ed8"}
          onMouseLeave={(e) => e.currentTarget.style.color = "#2563eb"}
        >
          ← Voltar
        </Link>
        <h1 style={{ marginBottom: "32px", fontSize: "32px", fontWeight: "700", color: "#1e293b" }}>➕ Publicar vaga</h1>

        <div style={{ background: "white", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)", border: "1px solid #dbeafe" }}>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "16px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Título da vaga</label>
              <input
                placeholder="Ex: Desenvolvedor Full Stack"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ ...inputStyle }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Localização</label>
              <input
                placeholder="Ex: Maputo, Beira, Matola"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ ...inputStyle }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Salário (MZN)</label>
              <input
                placeholder="Ex: 15.000"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                style={{ ...inputStyle }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: "600", color: "#1e293b" }}>Descrição</label>
              <textarea
                placeholder="Descreva os detalhes da vaga..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ ...inputStyle, minHeight: "140px" }}
              />
            </div>

            <button style={buttonStyle} type="submit">
              Publicar vaga
            </button>
          </form>

          {error && <p style={{ color: "#ef4444", marginTop: "16px", fontSize: "14px", fontWeight: "500" }}>❌ {error}</p>}
          {message && (
            <p style={{ color: "#10b981", marginTop: "16px", fontSize: "14px", fontWeight: "500" }}>
              ✓ {message} <Link href="/dashboard" style={{ fontWeight: "700", color: "#2563eb" }}>Ver vagas</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  boxSizing: "border-box",
  fontSize: "14px",
  fontFamily: "inherit",
  transition: "all 0.2s"
};

const buttonStyle = {
  marginTop: "8px",
  padding: "14px",
  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "16px",
  transition: "all 0.2s",
  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)"
};
