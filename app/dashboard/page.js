"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAuth, clearAuth } from "../../lib/auth";

export default function Dashboard() {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const auth = getAuth();
    if (!auth?.email) {
      router.push("/login");
    } else {
      setIsLogged(true);
    }
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
    <main className="min-h-screen bg-gray-50 p-3 pb-32 md:p-4">

      <div className="mb-6 rounded-2xl md:rounded-3xl bg-white p-4 md:p-6 shadow-sm">
        <h1 className="text-xl md:text-2xl font-bold">👋 Bem-vindo ao Trampo Moz</h1>
        <p className="mt-2 text-xs md:text-sm text-gray-600 leading-relaxed">Plataforma de empregos para você encontrar vagas, publicar oportunidades e manter seu perfil profissional atualizado.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <section className="rounded-2xl md:rounded-3xl bg-white p-4 md:p-6 shadow-sm">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">🔍 Procurar empregos</h2>
            <input
              type="text"
              placeholder="Buscar por cargo, por exemplo: Recepcionista"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 p-3 mb-4 text-sm md:text-base"
            />
            <div className="space-y-3">
              {filteredJobs.map((job) => (
                <div key={job.id} className="rounded-2xl md:rounded-3xl border border-slate-200 bg-slate-50 p-3 md:p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-sm md:text-base">{job.title}</h3>
                    <p className="text-xs md:text-sm text-gray-500">{job.location}</p>
                    <p className="text-blue-600 font-bold text-sm md:text-base">{job.salary}</p>
                  </div>
                  <Link
                    href={`/jobs/${job.id}/apply`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-green-600 px-4 py-3 text-white transition hover:bg-green-700 text-sm md:text-base font-semibold"
                  >
                    Candidatar-se
                  </Link>
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <p className="text-xs md:text-sm text-gray-500">Nenhuma vaga encontrada. Tente outra palavra-chave.</p>
              )}
            </div>
          </section>

        </div>

        <aside className="space-y-4 hidden lg:block">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="font-semibold mb-3">Navegação rápida</h2>
            <div className="space-y-3">
              <Link href="/" className="block rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-gray-700 transition hover:bg-slate-100 text-sm">
                🏠 Página inicial
              </Link>
              <Link href="/dashboard" className="block rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-gray-700 transition hover:bg-slate-100 text-sm">
                🔍 Buscar vagas
              </Link>
              <Link href="/post" className="block rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-gray-700 transition hover:bg-slate-100 text-sm">
                ➕ Publicar vaga
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-slate-200 bg-white p-2 md:p-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div className="flex justify-around flex-1 gap-2">
            <Link href="/" className="text-blue-600 text-xl md:text-2xl hover:scale-110 transition">🏠</Link>
            <Link href="/post" className="text-gray-700 text-xl md:text-2xl hover:scale-110 transition">➕</Link>
            <Link
              href="/profile"
              className="text-gray-700 text-xl md:text-2xl hover:scale-110 transition"
              title="Meu perfil"
            >
              👤
            </Link>
          </div>
          <button
            onClick={() => {
              clearAuth();
              router.push("/");
            }}
            className="ml-2 md:ml-4 text-xs md:text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sair
          </button>
        </div>
      </footer>

    </main>
  );

  if (!isLogged) return null;
}
