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
        padding: "40px 20px"
      }}>
        <div style={{ marginBottom: "40px" }}>
          <h1 style={{ fontSize: "clamp(28px, 8vw, 36px)", color: "#222", marginBottom: "10px" }}>
            Empregos Disponíveis
          </h1>
          <p style={{ color: "#555", fontSize: "clamp(14px, 3vw, 16px)", margin: "0" }}>
            {jobs.length === 0 ? "Confira em breve nossas vagas" : `${jobs.length} ${jobs.length === 1 ? "vaga disponível" : "vagas disponíveis"}`}
          </p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <input
            placeholder="Buscar por título ou localidade..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar empregos"
            style={{
              padding: "12px 16px",
              width: "100%",
              borderRadius: "6px",
              border: "2px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box",
              transition: "border-color 0.2s ease"
            }}
            onFocus={(e) => (e.target.style.borderColor = "#0070f3")}
            onBlur={(e) => (e.target.style.borderColor = "#ddd")}
          />
        </div>

        {filteredJobs.length > 0 ? (
          <div style={{
            display: "grid",
            gap: "20px"
          }}>
            {filteredJobs.map((job) => (
              <InteractiveLink
                key={job.id}
                href={`/jobs/${job.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
                }}>
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "10px"
                  }}>
                    <div>
                      <h3 style={{ fontSize: "18px", color: "#222", margin: "0 0 5px 0" }}>
                        {job.title}
                      </h3>
                      <p style={{ color: "#666", fontSize: "14px", margin: "0" }}>
                        {job.company}
                      </p>
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    gap: "20px",
                    fontSize: "14px",
                    color: "#666"
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
            padding: "40px 20px",
            textAlign: "center",
            borderRadius: "8px",
            border: "1px solid #eee"
          }}>
            <p style={{ color: "#999", fontSize: "16px", margin: "0" }}>
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
          }
        `}</style>
      </div>
    </div>
  );
}
