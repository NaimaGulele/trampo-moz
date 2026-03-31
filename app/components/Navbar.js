"use client";

import Link from "next/link";
import Logo from "./Logo";
import { useState } from "react";
import InteractiveLink from "./InteractiveLink";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinkStyle = {
    textDecoration: "none",
    color: "#333",
    fontSize: "15px",
    fontWeight: "500",
    transition: "color 0.2s ease",
    cursor: "pointer"
  };

  const mobileNavStyle = {
    position: "absolute",
    top: "70px",
    left: "0",
    right: "0",
    background: "#ffffff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    display: mobileOpen ? "flex" : "none",
    flexDirection: "column",
    gap: "0",
    zIndex: "99"
  };

  return (
    <>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 20px",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "sticky",
        top: "0",
        zIndex: "100"
      }}>
        
        <Logo />

        {/* Desktop Navigation */}
        <div style={{ 
          display: "flex", 
          gap: "25px", 
          alignItems: "center",
          "@media (maxWidth: 768px)": {
            display: "none"
          }
        }}>
          
          <InteractiveLink href="/" style={navLinkStyle}
            onMouseEnter={(e) => e.target.style.color = "#0070f3"}
            onMouseLeave={(e) => e.target.style.color = "#333"}
          >
            Home
          </InteractiveLink>

          <InteractiveLink href="/jobs" style={navLinkStyle}
            onMouseEnter={(e) => e.target.style.color = "#0070f3"}
            onMouseLeave={(e) => e.target.style.color = "#333"}
          >
            Empregos
          </InteractiveLink>

          <InteractiveLink href="/signin" style={{...navLinkStyle, color: "#0070f3"}}
            onMouseEnter={(e) => e.target.style.color = "#0051cc"}
            onMouseLeave={(e) => e.target.style.color = "#0070f3"}
          >
            Criar Conta
          </InteractiveLink>

          <InteractiveLink href="/login" style={{
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
            Entrar
          </InteractiveLink>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            display: "none",
            "@media (maxWidth: 768px)": {
              display: "block"
            },
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "24px",
            color: "#333",
            padding: "5px 10px"
          }}
          aria-label="Menu de navegação"
          aria-expanded={mobileOpen}
          className="mobile-menu-btn"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
      
      {mobileOpen && (
        <div style={{
          position: "absolute",
          top: "70px",
          left: "0",
          right: "0",
          background: "#ffffff",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          zIndex: "99",
          animation: "slideDown 0.3s ease"
        }}>
          
          <InteractiveLink href="/" onClick={() => setMobileOpen(false)} style={{
            ...navLinkStyle,
            padding: "16px 20px",
            borderBottom: "1px solid #eee"
          }}>
            Home
          </InteractiveLink>

          <InteractiveLink href="/jobs" onClick={() => setMobileOpen(false)} style={{
            ...navLinkStyle,
            padding: "16px 20px",
            borderBottom: "1px solid #eee"
          }}>
            Empregos
          </InteractiveLink>

          <InteractiveLink href="/signin" onClick={() => setMobileOpen(false)} style={{
            ...navLinkStyle,
            padding: "16px 20px",
            borderBottom: "1px solid #eee",
            color: "#0070f3"
          }}>
            Criar Conta
          </InteractiveLink>

          <InteractiveLink href="/login" onClick={() => setMobileOpen(false)} style={{
            padding: "16px 20px",
            textDecoration: "none",
            fontSize: "15px",
            fontWeight: "500",
            cursor: "pointer",
            color: "white",
            background: "#0070f3"
          }}>
            Entrar
          </InteractiveLink>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
