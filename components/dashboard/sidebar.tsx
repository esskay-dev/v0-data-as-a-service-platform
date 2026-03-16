"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Database, LayoutDashboard, Upload, Key, BarChart3,
  Settings, BookOpen, HelpCircle, ChevronLeft, Users,
} from "lucide-react"
import { useState } from "react"

const navItems = [
  { label: "Overview",   href: "/dashboard",            icon: LayoutDashboard },
  { label: "Datasets",   href: "/dashboard/datasets",   icon: Database },
  { label: "Upload",     href: "/dashboard/upload",     icon: Upload },
  { label: "API Keys",   href: "/dashboard/api-keys",   icon: Key },
  { label: "Analytics",  href: "/dashboard/analytics",  icon: BarChart3, badge: "New" },
  { label: "Users",      href: "/dashboard/users",      icon: Users },
]

const bottomItems = [
  { label: "Docs",       href: "/docs",                 icon: BookOpen },
  { label: "Support",    href: "/support",              icon: HelpCircle },
  { label: "Settings",   href: "/dashboard/settings",   icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href)

  return (
    <aside style={{
      position: "relative",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      width: collapsed ? "60px" : "228px",
      transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
      borderRight: "1px solid var(--border-subtle)",
      background: "var(--bg-subtle)",
      flexShrink: 0,
      overflow: "hidden",
    }}>

      {/* Logo */}
      <div style={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        padding: collapsed ? "0 14px" : "0 16px",
        borderBottom: "1px solid var(--border-subtle)",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <Link href="/dashboard" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", minWidth: 0 }}>
          <div style={{
            width: "28px", height: "28px", flexShrink: 0,
            borderRadius: "7px",
            background: "var(--brand-500)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Database size={14} style={{ color: "#fff" }} />
          </div>
          {!collapsed && (
            <span style={{
              fontFamily: "var(--font-display)",
              fontSize: "15px", fontWeight: 700,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}>
              DataFlow
            </span>
          )}
        </Link>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          position: "absolute", right: "-11px", top: "70px", zIndex: 10,
          width: "22px", height: "22px", borderRadius: "50%",
          background: "var(--bg-base)", border: "1px solid var(--border-default)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", transition: "all 0.15s ease",
          boxShadow: "var(--shadow-sm)",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--bg-muted)"}
        onMouseLeave={e => e.currentTarget.style.background = "var(--bg-base)"}
      >
        <ChevronLeft size={11} style={{
          color: "var(--text-tertiary)",
          transform: collapsed ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.25s ease",
        }} />
      </button>

      {/* Main nav */}
      <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: "2px", overflowY: "auto" }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              padding: collapsed ? "9px 14px" : "8px 10px",
              borderRadius: "var(--radius-md)",
              fontSize: "13.5px",
              fontWeight: isActive(item.href) ? 500 : 400,
              color: isActive(item.href) ? "var(--brand-700)" : "var(--text-secondary)",
              background: isActive(item.href) ? "var(--brand-50)" : "transparent",
              textDecoration: "none",
              transition: "all 0.12s ease",
              whiteSpace: "nowrap",
              overflow: "hidden",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            onMouseEnter={e => {
              if (!isActive(item.href)) {
                e.currentTarget.style.background = "var(--bg-muted)"
                e.currentTarget.style.color = "var(--text-primary)"
              }
            }}
            onMouseLeave={e => {
              if (!isActive(item.href)) {
                e.currentTarget.style.background = "transparent"
                e.currentTarget.style.color = "var(--text-secondary)"
              }
            }}
          >
            <item.icon size={16} style={{ flexShrink: 0 }} />
            {!collapsed && (
              <>
                <span style={{ flex: 1 }}>{item.label}</span>
                {item.badge && (
                  <span style={{
                    fontSize: "10px", fontWeight: 600,
                    background: "var(--brand-100)", color: "var(--brand-700)",
                    padding: "2px 7px", borderRadius: "100px",
                    letterSpacing: "0.03em",
                  }}>{item.badge}</span>
                )}
              </>
            )}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div style={{ padding: "8px 8px 0", borderTop: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column", gap: "2px" }}>
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            style={{
              display: "flex", alignItems: "center", gap: "9px",
              padding: collapsed ? "9px 14px" : "8px 10px",
              borderRadius: "var(--radius-md)",
              fontSize: "13.5px",
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "all 0.12s ease",
              whiteSpace: "nowrap", overflow: "hidden",
              justifyContent: collapsed ? "center" : "flex-start",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-muted)"; e.currentTarget.style.color = "var(--text-primary)" }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)" }}
          >
            <item.icon size={16} style={{ flexShrink: 0 }} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>

      {/* Usage / upgrade */}
      {!collapsed && (
        <div style={{ padding: "12px 12px 16px" }}>
          <div style={{
            background: "var(--bg-muted)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            padding: "12px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--text-primary)" }}>Free plan</span>
              <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>2,341 / 10K</span>
            </div>
            <div className="progress-track" style={{ marginBottom: "10px" }}>
              <div className="progress-fill" style={{ width: "23%" }} />
            </div>
            <Link href="/pricing" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary" style={{ width: "100%", height: "30px", fontSize: "12px" }}>
                Upgrade plan
              </button>
            </Link>
          </div>
        </div>
      )}
    </aside>
  )
}