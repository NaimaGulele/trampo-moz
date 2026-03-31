"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useState } from "react";

export default function JobDetails({ params }) {
  const [saved, setSaved] = useState(false);

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />

      <div style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "40px 20px"
      }}>
        <Link href="/jobs" style={{
          display: "inline-block",
          marginBottom: "30px",
          color: "#0070f3",
          textDecoration: "none",
          fontWeight: "bold",
          fontSize: "15px",
          transition: "color 0.2s ease"
        }}
        onMouseEnter={(e) => e.target.style.color = "#0051cc"}
        onMouseLeave={(e) => e.target.style.color = "#0070f3"}
        >
          ← Back to Jobs
        </Link>

        <div style={{
          background: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            marginBottom: "30px",
            paddingBottom: "30px",
            borderBottom: "1px solid #eee"
          }}>
            <div>
              <h1 style={{
                fontSize: "32px",
                color: "#222",
                marginBottom: "10px"
              }}>
                Job Details
              </h1>
              <p style={{
                color: "#666",
                fontSize: "16px",
                margin: "0"
              }}>
                Job ID: {params.id}
              </p>
            </div>
            <button
              onClick={() => setSaved(!saved)}
              style={{
                padding: "10px 20px",
                background: saved ? "#10b981" : "#f0f0f0",
                color: saved ? "white" : "#666",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                if (!saved) e.target.style.background = "#e0e0e0";
              }}
              onMouseLeave={(e) => {
                if (!saved) e.target.style.background = "#f0f0f0";
              }}
            >
              {saved ? "✓ Saved" : "Save Job"}
            </button>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px"
          }}>
            <div>
              <p style={{
                color: "#999",
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: "5px"
              }}>
                Position Type
              </p>
              <p style={{
                color: "#222",
                fontSize: "16px",
                margin: "0"
              }}>
                Full-time
              </p>
            </div>
            <div>
              <p style={{
                color: "#999",
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: "5px"
              }}>
                Salary
              </p>
              <p style={{
                color: "#0070f3",
                fontSize: "16px",
                margin: "0",
                fontWeight: "bold"
              }}>
                Paid in MZN 💰
              </p>
            </div>
            <div>
              <p style={{
                color: "#999",
                fontSize: "12px",
                textTransform: "uppercase",
                fontWeight: "bold",
                marginBottom: "5px"
              }}>
                Job ID
              </p>
              <p style={{
                color: "#222",
                fontSize: "16px",
                margin: "0",
                fontFamily: "monospace"
              }}>
                {params.id}
              </p>
            </div>
          </div>

          <p style={{
            padding: "15px",
            background: "#f0f7ff",
            border: "1px solid #d0e8ff",
            borderRadius: "6px",
            color: "#0070f3",
            fontSize: "14px",
            margin: "20px 0"
          }}>
            ℹ️ This is a demo job listing. Full job details will be displayed once connected to a database.
          </p>

          <div style={{ marginTop: "30px" }}>
            <button style={{
              width: "100%",
              padding: "16px",
              background: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s ease"
            }}
            onMouseEnter={(e) => e.target.style.background = "#0051cc"}
            onMouseLeave={(e) => e.target.style.background = "#0070f3"}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
