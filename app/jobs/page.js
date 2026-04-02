"use client";

import { useState } from "react";
import Link from "next/link";
import InteractiveLink from "../components/InteractiveLink";
import Navbar from "../components/Navbar";

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [jobs, setJobs] = useState([]);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />

      <div style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "clamp(24px, 8vw, 40px) clamp(16px, 5vw, 20px)"
      }}>
        <div style={{ marginBottom: "clamp(24px, 6vw, 40px)" }}>
          <h1 style={{ fontSize: "clamp(24px, 7vw, 36px)", color: "#222", marginBottom: "clamp(8px, 2vw, 12px)", wordBreak:"break-word" }}>
            Empregos Disponíveis
          </h1>
          <p style={{ color: "#555", fontSize: "clamp(13px, 3vw, 16px)", margin: "0" }}>
            {jobs.length === 0 ? "Confira em breve nossas vagas" : `${jobs.length} ${jobs.length === 1 ? "vaga disponível" : "vagas disponíveis"}`}
          </p>
        </div>

        <div style={{ marginBottom: "clamp(20px, 5vw, 30px)" }}>
          <input
            placeholder="Buscar por título ou localidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar empregos"
            style={{
              padding: "clamp(12px, 3vw, 14px) clamp(14px, 4vw, 16px)",
              width: "100%",
              borderRadius: "6px",
              border: "2px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box",
              transition: "border-color 0.2s ease",
              minHeight: "44px"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        {filteredJobs.length > 0 ? (
          <div style={{
            display: "grid",
            gap: "clamp(16px, 4vw, 20px)"
          }}>
            {filteredJobs.map((job) => (
              <InteractiveLink
                key={job.id}
                href={`/jobs/${job.id}`}
                style={{ textDecoration: "none", color: "inherit", display: "block", transition: "all 0.2s ease" }}
              >
                <div style={{
                  background: "white",
                  padding: "clamp(16px, 4vw, 20px)",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                  minHeight: "auto"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "clamp(10px, 2vw, 16px)",
                    gap: "12px",
                    flexWrap: "wrap"
                  }}>
                    <div style={{ flex: "1", minWidth: "200px" }}>
                      <h3 style={{ fontSize: "clamp(16px, 4vw, 20px)", color: "#222", margin: "0 0 6px 0", lineHeight: "1.3" }}>
                        {job.title}
                      </h3>
                      <p style={{ color: "#666", fontSize: "clamp(13px, 3vw, 15px)", margin: "0" }}>
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    gap: "clamp(12px, 3vw, 20px)",
                    fontSize: "clamp(12px, 2.5vw, 14px)",
                    color: "#666",
                    flexWrap: "wrap",
                    rowGap: "8px"
                  }}>
                    <span>📍 {job.location}</span>
                    <span>💰 {job.salary} MZN</span>
                    <span>{job.type}</span>
                  </div>
                </div>
              </InteractiveLink>
            ))}
          </div>
        ) : (
          <div style={{
            background: "white",
            padding: "clamp(32px, 8vw, 40px) clamp(16px, 4vw, 20px)",
            textAlign: "center",
            borderRadius: "8px",
            border: "1px solid #eee"
          }}>
            <p style={{ color: "#999", fontSize: "clamp(14px, 3vw, 16px)", margin: "0", lineHeight: "1.6" }}>
              {jobs.length === 0 ? "Nenhuma vaga disponível no momento. Volte em breve!" : "Nenhuma vaga encontrada com sua busca. Tente outros termos."}
            </p>
          </div>
        )}

        <style>{`
          a[href*="/jobs/"] > div {
            border-color: #eee;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }
          a[href*="/jobs/"]:hover > div {
            border-color: #0070f3;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
          }
          a[href*="/jobs/"]:active > div {
            transform: translateY(0);
          }
        `}</style>
      </div>
    </div>
  );
}
