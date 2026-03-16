"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Database, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function LandingHeader() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", fn)
    return () => window.removeEventListener("scroll", fn)
  }, [])

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      transition: "all 0.2s ease",
      borderBottom: scrolled ? "1px solid var(--border-subtle)" : "1px solid transparent",
      background: scrolled ? "rgba(var(--bg-base-rgb, 255,255,255), 0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
    }}>
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px", height: "64px", display: "flex", alignItems: "center" }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "var(--brand-500)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Database size={15} style={{ color: "#fff" }} />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
            DataFlow
          </span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px", marginLeft: "40px" }}>
          {[["Get Started", "/get-started"], ["Documentation", "/docs"], ["Pricing", "/pricing"]].map(([label, href]) => (
            <Link key={label} href={href} style={{
              padding: "6px 12px",
              fontSize: "14px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              borderRadius: "var(--radius-md)",
              transition: "all 0.12s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-muted)"; e.currentTarget.style.color = "var(--text-primary)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)" }}>
              {label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <ThemeToggle />
          <Link href="/login" style={{ textDecoration: "none" }}>
            <button className="btn btn-ghost" style={{ fontSize: "14px" }}>Sign in</button>
          </Link>
          <Link href="/register" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{ height: "36px", padding: "0 16px", fontSize: "14px" }}>
              Get started
            </button>
          </Link>
        </div>
      </div>
    </header>
  )
}