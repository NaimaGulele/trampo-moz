"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import Textarea from "../components/Textarea";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

export default function PostJob() {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !location || !salary || !description) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (isNaN(salary) || salary <= 0) {
      setError("Por favor, insira um salário válido em MZN");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Vaga publicada com sucesso!");
      setTitle("");
      setLocation("");
      setSalary("");
      setDescription("");
    }, 1000);
  };

  return (
    <div style={{ fontFamily: "Arial", minHeight: "100vh", background: "#f5f7fb" }}>
      <Navbar />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 80px)",
        padding: "20px"
      }}>
        <div style={{
          background: "white",
          padding: "40px 24px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "500px"
        }}>
          <h1 style={{ fontSize: "clamp(24px, 6vw, 28px)", marginBottom: "10px", color: "#222" }}>
            Publicar Vaga
          </h1>
          <p style={{ color: "#555", marginBottom: "30px", fontSize: "14px" }}>
            Compartilhe sua oportunidade com profissionais em Moçambique
          </p>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              label="Título da Vaga"
              type="text"
              placeholder="ex: Desenvolvedor Senior"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <FormInput
              label="Localidade"
              type="text"
              placeholder="ex: Maputo, Matola, Beira"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />

            <FormInput
              label="Salário (MZN)"
              type="number"
              placeholder="ex: 25000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />

            <Textarea
              label="Descrição da Vaga"
              placeholder="Descreva a função, responsabilidades e requisitos..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              required
            />

            <div style={{ marginBottom: "20px" }}>
              <Button
                variant="secondary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Publicando..." : "Publicar Vaga"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
