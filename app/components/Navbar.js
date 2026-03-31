"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "16px 40px",
      background: "#ffffff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      position: "sticky",
      top: "0",
      zIndex: "100"
    }}>
      
      <Logo />

      <div style={{ 
        display: "flex", 
        gap: "25px", 
        alignItems: "center"
      }}>
        
        <Link href="/" style={{ 
          textDecoration: "none", 
          color: "#333",
          fontSize: "15px",
          fontWeight: "500",
          transition: "color 0.2s ease",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => e.target.style.color = "#0070f3"}
        onMouseLeave={(e) => e.target.style.color = "#333"}
        >
          Home
        </Link>

        <Link href="/jobs" style={{ 
          textDecoration: "none", 
          color: "#333",
          fontSize: "15px",
          fontWeight: "500",
          transition: "color 0.2s ease",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => e.target.style.color = "#0070f3"}
        onMouseLeave={(e) => e.target.style.color = "#333"}
        >
          Jobs
        </Link>

        <Link href="/signin" style={{
          color: "#0070f3",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: "500",
          transition: "color 0.2s ease",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => e.target.style.color = "#0051cc"}
        onMouseLeave={(e) => e.target.style.color = "#0070f3"}
        >
          Sign Up
        </Link>

        <Link href="/login" style={{
          background: "#0070f3",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: "500",
          transition: "background 0.2s ease",
          cursor: "pointer"
        }}
        onMouseEnter={(e) => e.target.style.background = "#0051cc"}
        onMouseLeave={(e) => e.target.style.background = "#0070f3"}
        >
          Log In
        </Link>

      </div>
    </div>
  );
}
