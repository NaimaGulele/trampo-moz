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
    <main className="min-h-screen bg-gray-50 p-3 pb-32 md:p-4">
      <div className="mb-6 rounded-2xl md:rounded-3xl bg-white p-4 md:p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              {t("hello", language)} {userName}! 👤
            </h1>
            <p className="mt-2 text-xs md:text-sm text-gray-600">{t("updateProfile", language)}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="rounded-2xl md:rounded-3xl bg-white p-4 md:p-6 shadow-sm">
          <h2 className="text-base md:text-lg font-semibold mb-4">Perfil profissional</h2>
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Nome Completo *</label>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="mt-1 md:mt-2 w-full rounded-2xl border border-gray-300 p-2 md:p-3 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-700">Contacto *</label>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="+258 84 000 0000"
                  className="mt-1 md:mt-2 w-full rounded-2xl border border-gray-300 p-2 md:p-3 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-gray-700">Morada *</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Rua, Cidade, Bairro"
                className="mt-1 md:mt-2 w-full rounded-2xl border border-gray-300 p-2 md:p-3 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cargo/Profissão *</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Programador, Designer"
                className="mt-2 w-full rounded-2xl border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Resumo Profissional *</label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                rows={4}
                placeholder="Um resumo breve de suas competências"
                className="mt-2 w-full rounded-2xl border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Experiência *</label>
              <textarea
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                rows={4}
                placeholder="Descreva sua experiência anterior"
                className="mt-2 w-full rounded-2xl border border-gray-300 p-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Upload de CV</label>
              <div className="mt-2 flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <div className="w-full rounded-2xl border-2 border-dashed border-gray-300 p-4 text-center hover:bg-blue-50">
                    <span className="text-sm text-gray-600">
                      {cvFileName ? `✅ ${cvFileName}` : "Clique para enviar ou arraste aqui (PDF, Word)"}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCVFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button type="submit" className="w-full rounded-2xl bg-blue-600 py-3 text-white transition hover:bg-blue-700 font-semibold">
              Salvar Perfil
            </button>
          </form>

          {published && (
            <div className="mt-6 rounded-2xl bg-green-50 p-6 border border-green-200">
              <h3 className="font-semibold text-green-900 mb-4">✅ Perfil salvo com sucesso</h3>
              <div className="space-y-2 text-sm text-green-800">
                <p><strong>Nome:</strong> {fullName}</p>
                <p><strong>Contacto:</strong> {contact}</p>
                <p><strong>Morada:</strong> {address}</p>
                <p><strong>Cargo:</strong> {title}</p>
                {cvFileName && <p><strong>CV:</strong> {cvFileName}</p>}
              </div>
            </div>
          )}

          {notification && (
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-800">{notification}</p>
          )}
        </section>

        <aside className="space-y-4">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold mb-3">Navegação rápida</h2>
            <div className="space-y-3">
              <Link href="/dashboard" className="block rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-gray-700 transition hover:bg-slate-100">
                🧭 Voltar ao dashboard
              </Link>
              <Link href="/dashboard" className="block rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-gray-700 transition hover:bg-slate-100">
                🔍 Buscar vagas
              </Link>
              <Link href="/post" className="block rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-gray-700 transition hover:bg-slate-100">
                ➕ Publicar vaga
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white p-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex justify-around flex-1">
            <Link href="/" className="text-blue-600 text-2xl hover:scale-110 transition">🏠</Link>
            <Link href="/post" className="text-gray-700 text-2xl hover:scale-110 transition">➕</Link>
            <Link href="/profile" className="text-gray-700 text-2xl hover:scale-110 transition">👤</Link>
          </div>
          <button
            onClick={() => {
              clearAuth();
              router.push("/");
            }}
            className="ml-4 text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sair
          </button>
        </div>
      </footer>
    </main>
  );
}
