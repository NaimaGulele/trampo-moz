"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import InteractiveLink from "../components/InteractiveLink";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor, insira um email válido");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Conta criada com sucesso!");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
          maxWidth: "400px"
        }}>
          <h1 style={{ fontSize: "clamp(24px, 6vw, 28px)", marginBottom: "10px", color: "#222" }}>
            Criar Conta
          </h1>
          <p style={{ color: "#555", marginBottom: "30px", fontSize: "14px" }}>
            Junte-se ao TrampoMoz e encontre seu emprego
          </p>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit} noValidate>
            <FormInput
              label="Nome Completo"
              type="text"
              placeholder="João Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormInput
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <FormInput
              label="Confirmar Senha"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div style={{ marginBottom: "20px" }}>
              <Button
                variant="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Criando conta..." : "Criar Conta"}
              </Button>
            </div>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", color: "#555", fontSize: "14px" }}>
            Já tem uma conta?{" "}
            <InteractiveLink href="/login" style={{ color: "#0070f3", fontWeight: "bold", textDecoration: "none" }}>
              Faça login
            </InteractiveLink>
          </p>
        </div>
      </div>
    </div>
  );
}
