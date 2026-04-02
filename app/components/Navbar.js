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
    fontSize: "clamp(14px, 3vw, 15px)",
    fontWeight: "500",
    transition: "color 0.2s ease",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "44px",
    minWidth: "44px"
  };

  return (
    <>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "clamp(12px, 4vw, 16px) clamp(16px, 5vw, 20px)",
        background: "#ffffff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        position: "sticky",
        top: "0",
        zIndex: "100",
        gap: "16px"
      }}>
        
        <Logo />

        {/* Desktop Navigation */}
        <div className="desktop-nav" style={{ 
          display: "flex", 
          gap: "clamp(16px, 3vw, 25px)", 
          alignItems: "center"
        }}>
          
          <InteractiveLink href="/" style={navLinkStyle}>
            Home
          </InteractiveLink>

          <InteractiveLink href="/jobs" style={navLinkStyle}>
            Empregos
          </InteractiveLink>

          <InteractiveLink href="/signin" style={{...navLinkStyle, color: "#0070f3"}}>
            Criar Conta
          </InteractiveLink>

          <InteractiveLink 
            href="/login" 
            normalBgColor="#0070f3"
            hoverBgColor="#0051cc"
            style={{
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
          >
            Entrar
          </InteractiveLink>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-menu-btn"
          aria-label="Menu de navegação"
          aria-expanded={mobileOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "clamp(20px, 5vw, 24px)",
            color: "#333",
            padding: "12px 12px",
            minHeight: "44px",
            minWidth: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            touchAction: "manipulation",
            WebkitTapHighlightColor: "transparent",
            transition: "all 0.2s ease"
          }}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Navigation Menu */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
      
      {mobileOpen && (
        <div className="mobile-nav-menu" style={{
          position: "fixed",
          top: "calc(44px + clamp(12px, 4vw, 16px) + clamp(12px, 4vw, 16px))",
          left: "0",
          right: "0",
          background: "#ffffff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
          display: "flex",
          flexDirection: "column",
          gap: "0",
          zIndex: "99",
          animation: "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: "calc(100vh - 44px)",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch"
        }}>
          
          <InteractiveLink 
            href="/" 
            onClick={() => setMobileOpen(false)} 
            style={{
              ...navLinkStyle,
              padding: "16px clamp(16px, 5vw, 20px)",
              borderBottom: "1px solid #eee",
              width: "100%",
              justifyContent: "flex-start",
              minHeight: "auto"
            }}
          >
            Home
          </InteractiveLink>

          <InteractiveLink 
            href="/jobs" 
            onClick={() => setMobileOpen(false)} 
            style={{
              ...navLinkStyle,
              padding: "16px clamp(16px, 5vw, 20px)",
              borderBottom: "1px solid #eee",
              width: "100%",
              justifyContent: "flex-start",
              minHeight: "auto"
            }}
          >
            Empregos
          </InteractiveLink>

          <InteractiveLink 
            href="/signin" 
            onClick={() => setMobileOpen(false)} 
            style={{
              ...navLinkStyle,
              padding: "16px clamp(16px, 5vw, 20px)",
              borderBottom: "1px solid #eee",
              color: "#0070f3",
              width: "100%",
              justifyContent: "flex-start",
              minHeight: "auto"
            }}
          >
            Criar Conta
          </InteractiveLink>

          <InteractiveLink 
            href="/login" 
            onClick={() => setMobileOpen(false)} 
            style={{
              padding: "16px clamp(16px, 5vw, 20px)",
              textDecoration: "none",
              fontSize: "clamp(14px, 3vw, 15px)",
              fontWeight: "500",
              cursor: "pointer",
              color: "white",
              background: "#0070f3",
              transition: "all 0.2s ease",
              display: "block",
              width: "100%",
              textAlign: "left",
              minHeight: "44px",
              display: "flex",
              alignItems: "center"
            }}
          >
            Entrar
          </InteractiveLink>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 768px) {
          .mobile-nav-menu {
            animation: slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          }
        }
      `}</style>
    </>
  );
}
