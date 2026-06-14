"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabase";

// Mock data generator for 10 unique visitors (used in Simulation Mode)
const MOCK_VISITORS = [
  {
    id: "1b9d6bcd-b5d2-4fd7-95a3-cd8b11234567",
    visitor_id: "visitor-mz-001",
    device: "Mobile",
    location: "Maputo, Mozambique",
    browser: "Chrome",
    session_time: 185,
    device_speq: JSON.stringify({
      screenResolution: "390x844",
      viewportSize: "390x750",
      pixelRatio: 3,
      os: "iOS",
      cpuCores: 6,
      deviceMemory: "Unknown",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
  },
  {
    id: "2b9d6bcd-b5d2-4fd7-95a3-cd8b11234568",
    visitor_id: "visitor-mz-002",
    device: "Desktop",
    location: "Matola, Mozambique",
    browser: "Firefox",
    session_time: 420,
    device_speq: JSON.stringify({
      screenResolution: "1920x1080",
      viewportSize: "1920x940",
      pixelRatio: 1,
      os: "Windows",
      cpuCores: 8,
      deviceMemory: "8 GB",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
  },
  {
    id: "3b9d6bcd-b5d2-4fd7-95a3-cd8b11234569",
    visitor_id: "visitor-mz-003",
    device: "Mobile",
    location: "Beira, Mozambique",
    browser: "Samsung Browser",
    session_time: 90,
    device_speq: JSON.stringify({
      screenResolution: "412x915",
      viewportSize: "412x820",
      pixelRatio: 2.625,
      os: "Android",
      cpuCores: 8,
      deviceMemory: "4 GB",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "4b9d6bcd-b5d2-4fd7-95a3-cd8b11234570",
    visitor_id: "visitor-mz-004",
    device: "Tablet",
    location: "Nampula, Mozambique",
    browser: "Safari",
    session_time: 510,
    device_speq: JSON.stringify({
      screenResolution: "820x1180",
      viewportSize: "820x1080",
      pixelRatio: 2,
      os: "iOS",
      cpuCores: 8,
      deviceMemory: "Unknown",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  },
  {
    id: "5b9d6bcd-b5d2-4fd7-95a3-cd8b11234571",
    visitor_id: "visitor-mz-005",
    device: "Desktop",
    location: "Maputo, Mozambique",
    browser: "Edge",
    session_time: 1200,
    device_speq: JSON.stringify({
      screenResolution: "2560x1440",
      viewportSize: "2560x1330",
      pixelRatio: 1.25,
      os: "macOS",
      cpuCores: 10,
      deviceMemory: "16 GB",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "6b9d6bcd-b5d2-4fd7-95a3-cd8b11234572",
    visitor_id: "visitor-mz-006",
    device: "Mobile",
    location: "Quelimane, Mozambique",
    browser: "Chrome",
    session_time: 45,
    device_speq: JSON.stringify({
      screenResolution: "360x800",
      viewportSize: "360x720",
      pixelRatio: 2,
      os: "Android",
      cpuCores: 4,
      deviceMemory: "2 GB",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
  },
  {
    id: "7b9d6bcd-b5d2-4fd7-95a3-cd8b11234573",
    visitor_id: "visitor-mz-007",
    device: "Desktop",
    location: "Tete, Mozambique",
    browser: "Chrome",
    session_time: 310,
    device_speq: JSON.stringify({
      screenResolution: "1366x768",
      viewportSize: "1366x650",
      pixelRatio: 1,
      os: "Windows",
      cpuCores: 4,
      deviceMemory: "4 GB",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
  },
  {
    id: "8b9d6bcd-b5d2-4fd7-95a3-cd8b11234574",
    visitor_id: "visitor-mz-008",
    device: "Mobile",
    location: "Chimoio, Mozambique",
    browser: "Chrome",
    session_time: 15,
    device_speq: JSON.stringify({
      screenResolution: "390x844",
      viewportSize: "390x760",
      pixelRatio: 3,
      os: "iOS",
      cpuCores: 6,
      deviceMemory: "Unknown",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: "9b9d6bcd-b5d2-4fd7-95a3-cd8b11234575",
    visitor_id: "visitor-mz-009",
    device: "Desktop",
    location: "Inhambane, Mozambique",
    browser: "Firefox",
    session_time: 150,
    device_speq: JSON.stringify({
      screenResolution: "1440x900",
      viewportSize: "1440x810",
      pixelRatio: 2,
      os: "macOS",
      cpuCores: 8,
      deviceMemory: "8 GB",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
  },
  {
    id: "10b9d6bcd-b5d2-4fd7-95a3-cd8b11234576",
    visitor_id: "visitor-mz-010",
    device: "Mobile",
    location: "Xai-Xai, Mozambique",
    browser: "Opera",
    session_time: 275,
    device_speq: JSON.stringify({
      screenResolution: "412x892",
      viewportSize: "412x800",
      pixelRatio: 3.5,
      os: "Android",
      cpuCores: 8,
      deviceMemory: "6 GB",
    }),
    created_at: new Date(Date.now() - 1000 * 60 * 300).toISOString(),
  },
];

export default function VisitorsAnalytics() {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadVisitors = async () => {
    setLoading(true);
    setErrorMsg("");

    if (!supabase) {
      // Simulation Mode
      setVisitors(MOCK_VISITORS);
      setIsSimulated(true);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("site_visitors")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        throw error;
      }

      setVisitors(data || []);
      setIsSimulated(false);
    } catch (err) {
      console.error("Failed to load visitors from Supabase:", err);
      setErrorMsg(err.message || "Unknown database query error");
      // Fallback to mock data so UI remains usable
      setVisitors(MOCK_VISITORS);
      setIsSimulated(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  // Format session time (seconds -> MM:SS or HH:MM:SS)
  const formatSessionTime = (seconds) => {
    if (!seconds) return "0s";
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins < 60) {
      return `${mins}m ${secs}s`;
    }
    const hrs = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hrs}h ${remainingMins}m ${secs}s`;
  };

  // Helper to parse device specifications safely
  const parseSpecs = (specsStr) => {
    try {
      if (!specsStr) return {};
      return JSON.parse(specsStr);
    } catch {
      return { raw: specsStr };
    }
  };

  // Calculate quick metrics
  const totalCount = visitors.length;
  const avgSession = totalCount
    ? Math.round(visitors.reduce((acc, curr) => acc + (curr.session_time || 0), 0) / totalCount)
    : 0;

  // Find top location
  const locationCounts = visitors.reduce((acc, curr) => {
    if (curr.location) {
      acc[curr.location] = (acc[curr.location] || 0) + 1;
    }
    return acc;
  }, {});
  const topLocation = Object.keys(locationCounts).length
    ? Object.entries(locationCounts).sort((a, b) => b[1] - a[1])[0][0]
    : "N/A";

  // Find top browser
  const browserCounts = visitors.reduce((acc, curr) => {
    if (curr.browser) {
      acc[curr.browser] = (acc[curr.browser] || 0) + 1;
    }
    return acc;
  }, {});
  const topBrowser = Object.keys(browserCounts).length
    ? Object.entries(browserCounts).sort((a, b) => b[1] - a[1])[0][0]
    : "N/A";

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-16 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                📊 Painel de Visitantes
              </h1>
              {isSimulated && (
                <span className="bg-amber-100 text-amber-800 text-xs px-2.5 py-1 rounded-full font-semibold border border-amber-200">
                  Modo de Simulação
                </span>
              )}
            </div>
            <p className="text-slate-500 text-sm md:text-base mt-1">
              Monitoria de acessos únicos, geolocalização e especificações dos visitantes em tempo real.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition text-sm font-semibold shadow-sm"
            >
              Voltar ao Dashboard
            </Link>
            <button
              onClick={loadVisitors}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-2.5 text-white hover:bg-blue-700 transition text-sm font-semibold shadow-sm disabled:opacity-50"
            >
              {loading ? "A atualizar..." : "Actualizar"}
            </button>
          </div>
        </header>

        {/* Info Banner when simulated */}
        {isSimulated && (
          <div className="mb-6 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-amber-900 text-sm">
            <strong>Nota:</strong> O projecto está a correr em modo de simulação porque as chaves do Supabase em 
            <code className="mx-1 px-1.5 py-0.5 bg-amber-100 rounded font-mono text-xs">.env.local</code> 
            ainda não foram configuradas. A exibir 10 visitantes fictícios para demonstração.
            {errorMsg && (
              <p className="mt-2 text-xs text-amber-800 italic">
                Erro original: {errorMsg}
              </p>
            )}
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Visitantes Únicos
            </span>
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900 block mt-2">
              {totalCount}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Média de Sessão
            </span>
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900 block mt-2">
              {formatSessionTime(avgSession)}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Cidade Principal
            </span>
            <span className="text-base md:text-xl font-bold text-slate-900 block mt-2 truncate" title={topLocation}>
              {topLocation.split(",")[0]}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Navegador Principal
            </span>
            <span className="text-base md:text-xl font-bold text-slate-900 block mt-2 truncate" title={topBrowser}>
              {topBrowser}
            </span>
          </div>
        </div>

        {/* Visitors Table / Cards */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="font-bold text-slate-800 text-lg">Registo Detalhado de Visitantes</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-slate-500">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent mb-4"></div>
              <p>A carregar visitantes...</p>
            </div>
          ) : visitors.length === 0 ? (
            <div className="p-12 text-center text-slate-500">
              <span className="text-4xl block mb-2">🔍</span>
              <p className="font-semibold">Nenhum visitante registado ainda</p>
              <p className="text-sm text-slate-400 mt-1">
                Configure as variáveis do Supabase e aceda ao site para iniciar a monitoria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs font-semibold uppercase border-b border-slate-100">
                    <th className="p-4 pl-6">ID / Tipo</th>
                    <th className="p-4">Localização</th>
                    <th className="p-4">Navegador</th>
                    <th className="p-4">Tempo Ativo</th>
                    <th className="p-4 pr-6">Especificações Técnicas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {visitors.map((v) => {
                    const specs = parseSpecs(v.device_speq);
                    return (
                      <tr key={v.id} className="hover:bg-slate-50/50 transition">
                        <td className="p-4 pl-6">
                          <div className="font-semibold text-slate-900 truncate w-32" title={v.visitor_id}>
                            {v.visitor_id}
                          </div>
                          <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {v.device === "Desktop" ? "🖥️ Desktop" : v.device === "Tablet" ? "📁 Tablet" : "📱 Telemóvel"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="font-medium">{v.location || "Desconhecido"}</span>
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-sky-50 text-sky-700 rounded-lg text-xs font-bold border border-sky-100">
                            {v.browser}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-medium text-slate-800">
                          {formatSessionTime(v.session_time)}
                        </td>
                        <td className="p-4 pr-6">
                          {specs.os ? (
                            <div className="space-y-1 text-xs text-slate-500">
                              <div>
                                <span className="font-semibold text-slate-700">SO:</span> {specs.os} |{" "}
                                <span className="font-semibold text-slate-700">Res:</span> {specs.screenResolution}
                              </div>
                              <div className="flex gap-2">
                                <span>Cores: {specs.cpuCores}</span>
                                <span>•</span>
                                <span>RAM: {specs.deviceMemory || "N/A"}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs font-mono truncate max-w-[200px] block">
                              {v.device_speq || "N/A"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
