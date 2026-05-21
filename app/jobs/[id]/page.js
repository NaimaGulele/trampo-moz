"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth } from "../../../lib/auth";

export default function JobDetails({ params }) {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    setIsLogged(!!auth?.email);
  }, []);

  const redirectPath = `/jobs/${params.id}/apply`;
  const applyLink = isLogged ? redirectPath : `/login?redirect=${encodeURIComponent(redirectPath)}`;
  const buttonText = isLogged ? "Candidatar-se" : "Faça login para candidatar-se";

  return (
    <div style={{ padding: "40px", fontFamily: "Arial, sans-serif", backgroundColor: "#eef2f7", minHeight: "100vh" }}>
      <h1 style={{ color: "#0d6efd", marginBottom: "20px" }}>Detalhes da vaga</h1>

      <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>ID da vaga: {params.id}</p>

      <Link href="/dashboard" style={{
        display: "inline-block",
        marginTop: "20px",
        backgroundColor: "#6c757d",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        Voltar ao painel
      </Link>

      <Link href={applyLink} style={{
        display: "inline-block",
        marginTop: "20px",
        marginLeft: "10px",
        backgroundColor: "#16a34a",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        textDecoration: "none"
      }}>
        {buttonText}
      </Link>
    </div>
  );
}
