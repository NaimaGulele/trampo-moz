"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      // Simple check (in real app, verify password properly)
      if (userData.email === email) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        router.push("/dashboard"); // Go to dashboard with CV upload
      } else {
        alert("Invalid credentials");
      }
    } else {
      alert("No account found. Please sign up first.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Login</h1>
        <p>Welcome back to TrampoMoz</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary">Login</button>
        </form>
        <p className="auth-link">
          Don't have an account? <a href="/signin">Sign Up</a>
        </p>
      </div>
    </div>
  );
}