"use client"

import Link from "next/link"
import { Upload, Key, BarChart3, Database, ArrowUpRight, ArrowRight, Clock, CheckCircle2, AlertCircle, Zap, Activity } from "lucide-react"

const stats = [
  { label: "Total datasets",    value: "3",      change: "+1 this month",     trend: "up",  icon: Database,  href: "/dashboard/datasets" },
  { label: "API calls (30d)",   value: "2,341",  change: "+18% vs last month",trend: "up",  icon: Zap,       href: "/dashboard/analytics" },
  { label: "Active API keys",   value: "2",      change: "1 expiring soon",   trend: "warn",icon: Key,       href: "/dashboard/api-keys" },
  { label: "Avg response time", value: "38ms",   change: "−4ms vs last week", trend: "up",  icon: Activity,  href: "/dashboard/analytics" },
]

const datasets = [
  { name: "users_2024.csv",        rows: "1,250",  endpoint: "/api/v1/datasets/users",        status: "active",     updated: "2h ago" },
  { name: "products_catalog.json", rows: "856",    endpoint: "/api/v1/datasets/products",     status: "active",     updated: "1d ago" },
  { name: "transactions_q1.csv",   rows: "12,400", endpoint: "/api/v1/datasets/transactions", status: "processing", updated: "5m ago" },
]

const activity = [
  { msg: "Dataset 'users_2024.csv' updated",                    time: "2h ago",  type: "success" },
  { msg: "New API key created",                                  time: "1d ago",  type: "info" },
  { msg: "Rate limit warning on /api/v1/datasets/products",      time: "2d ago",  type: "warning" },
  { msg: "Dataset 'transactions_q1.csv' upload started",         time: "5m ago",  type: "info" },
]

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px", fontFamily: "var(--font-body)" }}>

      {/* Page header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px", fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--text-primary)",
            marginBottom: "4px",
          }}>Overview</h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)" }}>
            Welcome back — here's what's happening with your data platform.
          </p>
        </div>
        <Link href="/dashboard/upload" style={{ textDecoration: "none" }}>
          <button className="btn btn-primary" style={{ height: "36px", fontSize: "13.5px" }}>
            <Upload size={14} />
            Upload dataset
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} style={{ textDecoration: "none" }}>
            <div className="card card-hover" style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
                <div style={{
                  width: "36px", height: "36px",
                  background: "var(--bg-subtle)",
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <stat.icon size={16} style={{ color: "var(--brand-500)" }} />
                </div>
                {stat.trend === "up" && (
                  <div style={{ display: "flex", alignItems: "center", gap: "3px", fontSize: "11.5px", color: "#059669", fontWeight: 500 }}>
                    <ArrowUpRight size={12} /> up
                  </div>
                )}
                {stat.trend === "warn" && (
                  <span className="badge badge-amber">{stat.change}</span>
                )}
              </div>
              <div className="stat-value" style={{ marginBottom: "4px" }}>{stat.value}</div>
              <div style={{ fontSize: "12.5px", color: "var(--text-secondary)" }}>{stat.label}</div>
              {stat.trend !== "warn" && (
                <div style={{ fontSize: "11.5px", color: "var(--text-tertiary)", marginTop: "4px" }}>{stat.change}</div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* Datasets + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "20px" }}>

        {/* Datasets table */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>Recent datasets</div>
              <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>Your latest uploaded data</div>
            </div>
            <Link href="/dashboard/datasets" style={{ textDecoration: "none" }}>
              <button className="btn btn-ghost" style={{ fontSize: "12.5px", height: "30px", gap: "4px" }}>
                View all <ArrowRight size={12} />
              </button>
            </Link>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Dataset</th>
                <th>Endpoint</th>
                <th>Rows</th>
                <th>Status</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {datasets.map((ds) => (
                <tr key={ds.name} style={{ cursor: "pointer" }}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{
                        width: "30px", height: "30px", flexShrink: 0,
                        background: "var(--bg-subtle)", border: "1px solid var(--border-default)",
                        borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Database size={13} style={{ color: "var(--brand-500)" }} />
                      </div>
                      <span style={{ fontWeight: 500, fontSize: "13.5px" }}>{ds.name}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-tertiary)" }}>{ds.endpoint}</span>
                  </td>
                  <td style={{ fontSize: "13px" }}>{ds.rows}</td>
                  <td>
                    <span className={`badge ${ds.status === "active" ? "badge-green" : "badge-amber"}`}>
                      {ds.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12.5px", color: "var(--text-tertiary)" }}>
                      <Clock size={11} /> {ds.updated}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity feed */}
        <div className="card" style={{ overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>Activity</div>
            <div style={{ fontSize: "12px", color: "var(--text-tertiary)", marginTop: "2px" }}>Latest events</div>
          </div>
          <div style={{ padding: "8px 0" }}>
            {activity.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "flex-start", gap: "12px",
                padding: "12px 20px",
                borderBottom: i < activity.length - 1 ? "1px solid var(--border-subtle)" : "none",
              }}>
                <div style={{ marginTop: "2px", flexShrink: 0 }}>
                  {item.type === "success" && <CheckCircle2 size={14} style={{ color: "#059669" }} />}
                  {item.type === "warning" && <AlertCircle size={14} style={{ color: "#d97706" }} />}
                  {item.type === "info" && <div className="dot dot-neutral" style={{ marginTop: "2px" }} />}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.5, marginBottom: "2px" }}>{item.msg}</p>
                  <p style={{ fontSize: "11.5px", color: "var(--text-tertiary)" }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card" style={{ overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", fontFamily: "var(--font-display)" }}>Quick actions</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0" }}>
          {[
            { label: "Upload a dataset", icon: Upload, href: "/dashboard/upload", desc: "CSV, JSON, Parquet" },
            { label: "Create API key",    icon: Key,    href: "/dashboard/api-keys", desc: "Manage access" },
            { label: "View analytics",   icon: BarChart3, href: "/dashboard/analytics", desc: "Usage & performance" },
            { label: "Read the docs",    icon: Database, href: "/docs", desc: "Guides & reference" },
          ].map((action, i) => (
            <Link key={action.label} href={action.href} style={{ textDecoration: "none" }}>
              <div style={{
                padding: "20px 24px",
                borderRight: i < 3 ? "1px solid var(--border-subtle)" : "none",
                transition: "background 0.12s ease",
                cursor: "pointer",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-subtle)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
              >
                <div style={{
                  width: "36px", height: "36px",
                  background: "var(--bg-muted)", border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "12px",
                }}>
                  <action.icon size={16} style={{ color: "var(--brand-500)" }} />
                </div>
                <div style={{ fontSize: "13.5px", fontWeight: 500, color: "var(--text-primary)", marginBottom: "2px" }}>{action.label}</div>
                <div style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}