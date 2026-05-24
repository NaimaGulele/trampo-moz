"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { getAuth, getProfile } from "../../../../lib/auth";
import { LanguageContext } from "../../../components/LanguageProvider";

export default function ApplyPage() {
  const router = useRouter();
  const params = useParams();
  const jobId = params.id;

  const [isLogged, setIsLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { t } = useContext(LanguageContext);

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.email) {
      const redirectPath = `/jobs/${jobId}/apply`;
      router.replace(`/login?redirect=${encodeURIComponent(redirectPath)}`);
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

    setIsLoading(false);
  }, [jobId, router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const auth = getAuth();
    if (!auth?.email) {
      setError(t('apply.login_required') ?? "Por favor, faça login antes de candidatar-se.");
      router.replace("/login");
      return;
    }

    if (!fullName || !contact || !address) {
      setError(t('apply.complete_profile') ?? "Por favor, complete seu perfil com nome, contacto e morada.");
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

  if (isLoading) {
    return (
      <main style={{ fontFamily: "Arial", padding: "16px", maxWidth: "800px", margin: "0 auto", paddingBottom: "80px" }}>
        <p style={{ color: "#374151", fontSize: "1rem", textAlign: "center", marginTop: "80px" }}>{t('apply.checking')}</p>
      </main>
    );
  }

  if (!isLogged) return null;

  return (
    <main style={{ fontFamily: "Arial", padding: "16px", maxWidth: "800px", margin: "0 auto", paddingBottom: "80px" }}>
      <Link
        href="/dashboard"
        style={{ display: "inline-flex", alignItems: "center", color: "#0f4c81", marginBottom: "20px", textDecoration: "none", fontSize: "0.95rem" }}
      >
        ← {t('apply.back_to_jobs')}
      </Link>

      {!submitted ? (
        <>
          <h1 style={{ marginBottom: "20px", fontSize: "clamp(1.5rem, 5vw, 2rem)" }}>📝 {t('apply.title') ?? 'Candidatura'}</h1>

          <div style={{ background: "#eff6ff", padding: "14px", borderRadius: "12px", marginBottom: "20px", border: "1px solid rgba(15, 118, 255, 0.15)" }}>
            <h2 style={{ color: "#0f4c81", marginBottom: "10px", fontSize: "1.1rem" }}>{jobTitle}</h2>
            <p style={{ marginBottom: "5px", fontSize: "0.95rem" }}><strong>{t('apply.location_label')}</strong> {jobLocation}</p>
            <p style={{ fontSize: "0.95rem" }}><strong>{t('apply.salary_label')}</strong> {jobSalary}</p>
          </div>

          <h3 style={{ marginBottom: "15px", marginTop: "24px", fontSize: "1rem" }}>{t('apply.your_info') ?? 'Suas informações:'}</h3>

          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>{t('apply.full_name') ?? 'Nome Completo *'}</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={t('apply.full_name')}
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
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>{t('apply.email') ?? 'Email'}</label>
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
              <p style={{ marginTop: "8px", color: "#4b5563", fontSize: "0.9rem" }}>
                {t('apply.email_notice') ?? 'Este email será usado na sua candidatura. Use sempre o email real para não esquecer.'}
              </p>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>{t('apply.contact') ?? 'Contacto *'}</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder={t('apply.contact')}
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
              <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "0.95rem" }}>{t('apply.address') ?? 'Morada *'}</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t('apply.address')}
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
                background: "#0f4c81",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold"
              }}
            >
              {t('apply.confirm') ?? 'Confirmar Candidatura'}
            </button>
          </form>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "24px" }}>
          <h1 style={{ color: "#16a34a", marginBottom: "16px", fontSize: "clamp(1.3rem, 5vw, 1.8rem)" }}>{t('apply.success_title') ?? '✅ Candidatura feita com sucesso!'}</h1>
          <p style={{ fontSize: "clamp(0.95rem, 4vw, 1.1rem)", marginBottom: "10px", lineHeight: "1.5" }}>{t('apply.success_msg')?.replace('{job}', jobTitle) ?? `Sua candidatura para ${jobTitle} foi recebida.`}</p>
          <p style={{ marginBottom: "20px", color: "#666", fontSize: "0.95rem", lineHeight: "1.5" }}>{t('apply.success_note') ?? 'Em breve, os recrutadores entrarão em contacto através do email e contacto fornecidos.'}</p>

          <Link
            href="/dashboard"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              background: "#0f4c81",
              color: "white",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.95rem"
            }}
          >
            {t('apply.back_to_jobs')}
          </Link>
        </div>
      )}
    </main>
  );
}
