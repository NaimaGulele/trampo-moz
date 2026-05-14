"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getAuth, getProfile } from "../../../../lib/auth";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [isLogged, setIsLogged] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.email) {
      router.push("/login");
      return;
    }

    setEmail(auth.email);
    setIsLogged(true);

    // Load user profile
    const profile = getProfile(auth.email);
    if (profile) {
      setFullName(profile.fullName || "");
      setContact(profile.contact || "");
      setAddress(profile.address || "");
    }

    // Load job details from localStorage
    const storedJobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    const defaultJobs = [
      { id: 1, title: "Promotora", location: "Maputo", salary: "3500 MZN" },
      { id: 2, title: "Recepcionista", location: "Matola", salary: "5000 MZN" },
      { id: 3, title: "Recepcionista", location: "Maputo", salary: "8.000 MZN" },
      { id: 4, title: "Motorista", location: "Matola", salary: "10.000 MZN" },
      { id: 5, title: "Técnico de TI", location: "Beira", salary: "15.000 MZN" },
    ];
    const allJobs = [...defaultJobs, ...storedJobs];
    const job = allJobs.find((j) => String(j.id) === jobId);

    if (job) {
      setJobTitle(job.title);
      setJobLocation(job.location);
      setJobSalary(job.salary);
    }
  }, [jobId, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !contact || !address) {
      setError("Por favor, complete seu perfil com nome, contacto e morada.");
      return;
    }

    // Save application to localStorage
    const applications = JSON.parse(localStorage.getItem("trampoApplications") || "[]");
    applications.push({
      id: Date.now(),
      jobId,
      jobTitle,
      jobLocation,
      jobSalary,
      candidateName: fullName,
      candidateEmail: email,
      candidateContact: contact,
      candidateAddress: address,
      appliedAt: new Date().toISOString(),
    });
    localStorage.setItem("trampoApplications", JSON.stringify(applications));

    setSubmitted(true);
    setError("");
  };

  if (!isLogged) return null;

  return (
    <main style={{ fontFamily: "Arial", padding: "16px", maxWidth: "800px", margin: "0 auto", paddingBottom: "80px" }}>
      <Link
        href="/dashboard"
        style={{ display: "inline-flex", alignItems: "center", color: "#2563eb", marginBottom: "20px", textDecoration: "none", fontSize: "0.95rem" }}
      >
        ← Voltar às vagas
      </Link>

      {!submitted ? (
        <>
          <h1 style={{ marginBottom: "20px", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>📝 Candidatura</h1>

          <div style={{ background: "#e3f2fd", padding: "14px", borderRadius: "12px", marginBottom: "20px" }}>
            <h2 style={{ color: "#1976d2", marginBottom: "10px", fontSize: "1.1rem" }}>{jobTitle}</h2>
            <p style={{ marginBottom: "5px", fontSize: "0.95rem" }}><strong>Localização:</strong> {jobLocation}</p>
            <p style={{ fontSize: "0.95rem" }}><strong>Salário:</strong> {jobSalary}</p>
          </div>

          <h3 style={{ marginBottom: "15px", marginTop: "24px", fontSize: "1rem" }}>Suas informações:</h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>Nome Completo *</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Seu nome completo"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box",
                  fontSize: "16px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>Email</label>
              <input
                type="email"
                value={email}
                readOnly
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box",
                  backgroundColor: "#f5f5f5",
                  fontSize: "16px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>Contacto *</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="+258 84 000 0000"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box",
                  fontSize: "16px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>Morada *</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, Cidade, Bairro"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxSizing: "border-box",
                  fontSize: "16px"
                }}
              />
            </div>

            {error && <p style={{ color: "#dc2626", fontWeight: "bold", background: "#fee2e2", padding: "12px", borderRadius: "8px", fontSize: "0.95rem" }}>{error}</p>}

            <button
              type="submit"
              style={{
                marginTop: "12px",
                padding: "14px",
                background: "#16a34a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              Confirmar Candidatura
            </button>
          </form>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "24px" }}>
          <h1 style={{ color: "#16a34a", marginBottom: "16px", fontSize: "clamp(1.3rem, 5vw, 1.8rem)" }}>✅ Candidatura feita com sucesso!</h1>
          <p style={{ fontSize: "clamp(0.95rem, 4vw, 1.1rem)", marginBottom: "10px", lineHeight: "1.5" }}>Sua candidatura para <strong>{jobTitle}</strong> foi recebida.</p>
          <p style={{ marginBottom: "20px", color: "#666", fontSize: "0.95rem", lineHeight: "1.5" }}>Em breve, os recrutadores entrarão em contacto através do email e contacto fornecidos.</p>

          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#0070f3",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.95rem"
            }}
          >
            Voltar às vagas
          </Link>
        </div>
      )}
    </main>
  );
}
