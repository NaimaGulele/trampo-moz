"use client";

import { useState } from "react";
import Link from "next/link";
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
          <h1 style={{ fontSize: "36px", color: "#222", marginBottom: "10px" }}>
            Available Jobs
          </h1>
          <p style={{ color: "#555", fontSize: "16px" }}>
            {jobs.length} jobs available
          </p>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <input
            placeholder="Search by job title or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "14px",
              width: "100%",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "16px",
              boxSizing: "border-box"
            }}
          />
        </div>

        {filteredJobs.length > 0 ? (
          <div style={{
            display: "grid",
            gap: "20px"
          }}>
            {filteredJobs.map((job) => (
              <Link
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
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                  e.currentTarget.style.borderColor = "#0070f3";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                  e.currentTarget.style.borderColor = "#eee";
                }}
                >
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
              </Link>
            ))}
          </div>
        ) : (
          <div style={{
            background: "white",
            padding: "40px",
            textAlign: "center",
            borderRadius: "8px",
            border: "1px solid #eee"
          }}>
            <p style={{ color: "#999", fontSize: "16px", margin: "0" }}>
              {jobs.length === 0 ? "No jobs available yet. Check back soon!" : "No jobs found matching your search."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
