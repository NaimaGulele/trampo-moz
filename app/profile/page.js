"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearAuth, getAuth, getProfile, saveProfile } from "../../lib/auth";
import { getLanguage, t } from "../../lib/i18n";

export default function ProfilePage() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [language, setLanguage] = useState("pt");
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [experience, setExperience] = useState("");
  const [cvFileName, setCvFileName] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [published, setPublished] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const auth = getAuth();
    setLanguage(getLanguage());
    if (!auth?.email) {
      router.push("/login");
    } else {
      setIsLogged(true);
      setUserName(auth.name || "");
      const storedProfile = getProfile(auth.email);
      if (storedProfile) {
        setFullName(storedProfile.fullName || "");
        setContact(storedProfile.contact || "");
        setAddress(storedProfile.address || "");
        setTitle(storedProfile.title || "");
        setSummary(storedProfile.summary || "");
        setExperience(storedProfile.experience || "");
        setCvFileName(storedProfile.cvFileName || "");
        setPublished(!!storedProfile.fullName);
      }
    }
  }, [router]);

  const handleCVFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === "application/pdf" || file.type === "application/msword" || file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        setCvFile(file);
        setCvFileName(file.name);
      } else {
        setNotification("Por favor, envie um arquivo PDF ou Word.");
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fullName || !contact || !address || !title || !summary || !experience) {
      setNotification("Preencha todos os campos antes de publicar seu perfil.");
      setPublished(false);
      return;
    }
    const auth = getAuth();
    if (!auth?.email) {
      setNotification("Não foi possível salvar o perfil. Faça login novamente.");
      return;
    }

    const profileData = {
      fullName,
      contact,
      address,
      title,
      summary,
      experience,
      cvFileName,
    };
    saveProfile(auth.email, profileData);
    setNotification("");
    setPublished(true);
  };

  if (!isLogged) return null;

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)", padding: "20px", paddingBottom: "120px" }}>
      <div style={{ marginBottom: "30px", borderRadius: "16px", background: "white", padding: "24px", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)", border: "1px solid #dbeafe" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#1e293b", marginBottom: "8px" }}>
              {t("hello", language)} {userName}! 👤
            </h1>
            <p style={{ marginTop: "8px", fontSize: "14px", color: "#64748b" }}>{t("updateProfile", language)}</p>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
        <section style={{ borderRadius: "16px", background: "white", padding: "32px", boxShadow: "0 4px 12px rgba(15, 23, 42, 0.1)", border: "1px solid #dbeafe" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "600", marginBottom: "24px", color: "#1e293b" }}>Perfil profissional</h2>
          <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Nome Completo *</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                  style={{ width: "100%", borderRadius: "10px", border: "1px solid #cbd5e1", padding: "12px", fontSize: "14px", boxSizing: "border-box", transition: "all 0.2s" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
                />
              </div>
              <div>
                <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Contacto *</label>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+258 84 000 0000"
                  style={{ width: "100%", borderRadius: "10px", border: "1px solid #cbd5e1", padding: "12px", fontSize: "14px", boxSizing: "border-box", transition: "all 0.2s" }}
                  onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                  onBlur={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Morada *</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, Cidade, Bairro"
                style={{ width: "100%", borderRadius: "10px", border: "1px solid #cbd5e1", padding: "12px", fontSize: "14px", boxSizing: "border-box", transition: "all 0.2s" }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Cargo/Profissão *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Programador, Designer"
                style={{ width: "100%", borderRadius: "10px", border: "1px solid #cbd5e1", padding: "12px", fontSize: "14px", boxSizing: "border-box", transition: "all 0.2s" }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Resumo Profissional *</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                placeholder="Um resumo breve de suas competências"
                style={{ width: "100%", borderRadius: "10px", border: "1px solid #cbd5e1", padding: "12px", fontSize: "14px", boxSizing: "border-box", transition: "all 0.2s", fontFamily: "inherit" }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "8px" }}>Experiência *</label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={4}
                placeholder="Descreva sua experiência anterior"
                style={{ width: "100%", borderRadius: "10px", border: "1px solid #cbd5e1", padding: "12px", fontSize: "14px", boxSizing: "border-box", transition: "all 0.2s", fontFamily: "inherit" }}
                onFocus={(e) => e.currentTarget.style.borderColor = "#2563eb"}
                onBlur={(e) => e.currentTarget.style.borderColor = "#cbd5e1"}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "14px", fontWeight: "600", color: "#1e293b", marginBottom: "12px" }}>Upload de CV</label>
              <label style={{ display: "block", cursor: "pointer" }}>
                <div style={{ width: "100%", borderRadius: "10px", border: "2px dashed #cbd5e1", padding: "24px", textAlign: "center", transition: "all 0.2s", background: "#f0f9ff" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#2563eb";
                  e.currentTarget.style.background = "#dbeafe";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#cbd5e1";
                  e.currentTarget.style.background = "#f0f9ff";
                }}
                >
                  <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "500" }}>
                    {cvFileName ? `✅ ${cvFileName}` : "📄 Clique para enviar ou arraste aqui (PDF, Word)"}
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleCVFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            <button type="submit" style={{ width: "100%", borderRadius: "10px", background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)", padding: "14px", color: "white", border: "none", fontWeight: "600", fontSize: "16px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(37, 99, 235, 0.4)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(37, 99, 235, 0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
            >
              Salvar Perfil
            </button>
          </form>

          {published && (
            <div style={{ marginTop: "24px", borderRadius: "12px", background: "#f0fdf4", padding: "20px", border: "1px solid #86efac" }}>
              <h3 style={{ fontWeight: "600", color: "#166534", marginBottom: "16px" }}>✅ Perfil salvo com sucesso</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px", color: "#166534" }}>
                <p><strong>Nome:</strong> {fullName}</p>
                <p><strong>Contacto:</strong> {contact}</p>
                <p><strong>Morada:</strong> {address}</p>
                <p><strong>Cargo:</strong> {title}</p>
                {cvFileName && <p><strong>CV:</strong> {cvFileName}</p>}
              </div>
            </div>
          )}

          {notification && (
            <p style={{ marginTop: "16px", borderRadius: "10px", background: "#fef2f2", padding: "16px", fontSize: "14px", color: "#991b1b", border: "1px solid #fecaca" }}>❌ {notification}</p>
          )}
        </section>
      </div>

      <footer style={{ position: "fixed", bottom: "0", left: "0", right: "0", zIndex: "10", borderTop: "1px solid #e2e8f0", background: "white", padding: "12px 16px", boxShadow: "0 -4px 12px rgba(15, 23, 42, 0.1)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-around", flex: 1, gap: "16px" }}>
            <Link href="/" style={{ fontSize: "24px", textDecoration: "none", transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>🏠</Link>
            <Link href="/post" style={{ fontSize: "24px", textDecoration: "none", color: "#64748b", transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>➕</Link>
            <Link href="/profile" style={{ fontSize: "24px", textDecoration: "none", color: "#64748b", transition: "transform 0.2s", cursor: "pointer" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.2)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}>👤</Link>
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
}
