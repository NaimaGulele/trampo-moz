"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { getAuth } from "../../lib/auth";
import { LanguageContext } from "../components/LanguageProvider";

export default function PostJob() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
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
  }, [router]);

  const { t } = useContext(LanguageContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title || !location || !salary || !description) {
      setError(t('post.fill_error') ?? 'Preencha todos os campos antes de publicar.');
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
    <div style={{ fontFamily: "Arial" }}>
      <Navbar />

      <div style={{ padding: "16px", maxWidth: "720px", margin: "0 auto", paddingBottom: "80px" }}>
        <Link
          href="/dashboard"
          style={{ display: "inline-flex", alignItems: "center", color: "#2563eb", marginBottom: "20px", textDecoration: "none", fontSize: "0.95rem" }}
        >
          ← {t('post.back') ?? 'Voltar'}
        </Link>
        <h1 style={{ marginBottom: "20px", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>➕ {t('footer.publicar_vaga')}</h1>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
          <input
            placeholder={t('post.title_placeholder') ?? 'Título da vaga'}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ ...inputStyle, fontSize: "16px" }}
          />
          <input
            placeholder={t('post.location_placeholder') ?? 'Localização'}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ ...inputStyle, fontSize: "16px" }}
          />
          <input
            placeholder={t('post.salary_placeholder') ?? 'Salário (MZN)'}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            style={{ ...inputStyle, fontSize: "16px" }}
          />
          <textarea
            placeholder={t('post.description_placeholder') ?? 'Descrição'}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ ...inputStyle, minHeight: "120px", fontSize: "16px" }}
          />

          <button style={buttonStyle} type="submit">
            {t('post.publish') ?? 'Publicar'}
          </button>
        </form>

        {error && <p style={{ color: "#dc2626", marginTop: "14px" }}>{error}</p>}
        {message && (
          <p style={{ color: "#047857", marginTop: "14px" }}>
            {message} <Link href="/dashboard" style={{ fontWeight: "700" }}>{t('post.view_jobs') ?? 'Ver vagas'}</Link>
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  marginBottom: "0",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxSizing: "border-box"
};

const buttonStyle = {
  marginTop: "12px",
  padding: "14px",
  background: "#0070f3",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: 600,
  fontSize: "16px"
};