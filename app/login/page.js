"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import FormInput from "../components/FormInput";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Login successful!");
      setEmail("");
      setPassword("");
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
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px"
        }}>
          <h1 style={{ fontSize: "28px", marginBottom: "10px", color: "#222" }}>
            Welcome Back
          </h1>
          <p style={{ color: "#555", marginBottom: "30px" }}>
            Sign in to your account
          </p>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit}>
            <FormInput
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div style={{ marginBottom: "20px" }}>
              <Button
                variant="primary"
                disabled={loading}
                onClick={handleSubmit}
              >
                {loading ? "Signing in..." : "Log In"}
              </Button>
            </div>
          </form>

          <p style={{ textAlign: "center", marginTop: "20px", color: "#555", fontSize: "14px" }}>
            Don&apos;t have an account?{" "}
            <Link href="/signin" style={{ color: "#0070f3", fontWeight: "bold", textDecoration: "none" }}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
