import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px 40px",
      background: "#ffffff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
    }}>
      
      <Logo />

      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        
        <Link href="/" style={{ textDecoration: "none", color: "#333" }}>
          Home
        </Link>

        <Link href="/signin" style={{
          color: "#0070f3",
          textDecoration: "none"
        }}>
          Sign In
        </Link>

        <Link href="/login" style={{
          background: "#0070f3",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          textDecoration: "none"
        }}>
          Log In
        </Link>

      </div>
    </div>
  );
}