import Link from "next/link"
import { LandingHeader } from "@/components/landing/header"
import {
  Database, Upload, Code2, BarChart3, Shield, Zap,
  ArrowRight, GitBranch, Globe, Sparkles, Play, ChevronRight, Activity,
} from "lucide-react"

const features = [
  { icon: Upload,    title: "Effortless ingestion",   description: "Drag-and-drop CSV, JSON, or Parquet. Connect databases directly. Schema detection runs automatically." },
  { icon: Code2,     title: "Instant REST APIs",       description: "Every dataset becomes a production-ready endpoint with filtering, pagination, sorting, and full-text search." },
  { icon: BarChart3, title: "Real-time analytics",     description: "Monitor usage, track latency, and visualize trends. Understand exactly how your data is being consumed." },
  { icon: Shield,    title: "Enterprise security",     description: "API key management, rate limiting, IP allowlisting, and SOC 2 compliant infrastructure built-in." },
  { icon: Zap,       title: "Sub-50ms globally",       description: "Edge-cached, globally distributed. Queries resolve fast regardless of where your consumers are." },
  { icon: GitBranch, title: "Version control",         description: "Track every schema change, compare versions, roll back instantly, and audit with confidence." },
]

const steps = [
  { number: "01", title: "Upload your data",     description: "Drop any file or connect your database. DataFlow handles CSV, JSON, Parquet, and direct DB connections with automatic schema inference.", icon: Upload },
  { number: "02", title: "API auto-generates",   description: "We analyze your schema, build optimized indexes, and expose RESTful endpoints — complete with live documentation.", icon: Code2 },
  { number: "03", title: "Query from anywhere",  description: "One API key. Filter, sort, paginate, search. Integrate with any language, framework, or platform in minutes.", icon: Globe },
]

const metrics = [
  { value: "50ms",  label: "Avg. response time" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "10M+",  label: "API calls served" },
  { value: "3 sec", label: "From upload to live" },
]

const footerCols = [
  { heading: "Product", links: [["Get Started", "/get-started"], ["Documentation", "/docs"], ["Pricing", "/pricing"], ["Changelog", "/changelog"]] },
  { heading: "Company", links: [["About", "/about"], ["Blog", "/blog"], ["Careers", "/careers"], ["Contact", "/contact"]] },
  { heading: "Legal",   links: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Security", "/security"], ["SLA", "/sla"]] },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-base)", fontFamily: "var(--font-body)" }}>
      <LandingHeader />

      {/* Hero */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: "140px", paddingBottom: "100px" }}>
        <div className="grid-pattern" style={{ position: "absolute", inset: 0, opacity: 0.5 }} />
        <div className="glow-blob" style={{ width: "600px", height: "600px", top: "-200px", left: "50%", transform: "translateX(-60%)", background: "radial-gradient(circle, rgba(45,111,255,0.12) 0%, transparent 70%)" }} />
        <div className="glow-blob" style={{ width: "400px", height: "400px", top: "100px", right: "-100px", background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)", animationDelay: "2s" }} />

        <div style={{ position: "relative", maxWidth: "1120px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div className="animate-fade-up" style={{ marginBottom: "28px" }}>
            <span className="badge badge-brand">
              <Sparkles size={11} />
              <span>AI-powered schema detection · Now in GA</span>
            </span>
          </div>

          <h1 className="animate-fade-up delay-100" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(42px, 7vw, 76px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: "24px", color: "var(--text-primary)" }}>
            Your data,{" "}
            <span className="gradient-text">production-ready</span>
            <br />APIs in seconds
          </h1>

          <p className="animate-fade-up delay-200" style={{ fontSize: "18px", fontWeight: 300, lineHeight: 1.7, color: "var(--text-secondary)", maxWidth: "560px", margin: "0 auto 40px" }}>
            Upload any dataset and instantly get a fully-featured REST API.
            No backend code, no infrastructure. Just data that works.
          </p>

          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/register" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary" style={{ height: "46px", padding: "0 24px", fontSize: "15px" }}>
                Start building free <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/docs" style={{ textDecoration: "none" }}>
              <button className="btn btn-secondary" style={{ height: "46px", padding: "0 20px", fontSize: "15px" }}>
                <Play size={14} /> Watch demo
              </button>
            </Link>
          </div>

          <p className="animate-fade-up delay-400" style={{ marginTop: "16px", fontSize: "13px", color: "var(--text-tertiary)" }}>
            Free tier available · No credit card required
          </p>

          {/* Code preview */}
          <div className="animate-fade-up delay-500" style={{ marginTop: "72px", maxWidth: "680px", margin: "72px auto 0" }}>
            <div className="card" style={{ overflow: "hidden", textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-subtle)" }}>
                <div style={{ display: "flex", gap: "6px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }} />
                </div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-tertiary)", marginLeft: "8px" }}>
                  GET /api/v1/datasets/customers
                </span>
                <span className="badge badge-green" style={{ marginLeft: "auto" }}>200 OK</span>
              </div>
              <div className="code-block" style={{ borderRadius: 0, margin: 0, fontSize: "13px" }}>
                {`{
  "data": [
    {
      "id": 1,
      "name": "Amara Nwosu",
      "email": "amara@acme.io",
      "plan": "enterprise"
    }
  ],
  "meta": { "total": 4821, "page": 1 }
}`}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics bar */}
      <section style={{ borderTop: "1px solid var(--border-subtle)", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-subtle)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            {metrics.map((m, i) => (
              <div key={i} style={{ padding: "28px 24px", borderRight: i < 3 ? "1px solid var(--border-subtle)" : "none", textAlign: "center" }}>
                <div className="stat-value" style={{ fontSize: "32px", marginBottom: "4px" }}>{m.value}</div>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="badge badge-neutral" style={{ marginBottom: "16px" }}>How it works</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "16px" }}>
              Three steps to production
            </h2>
            <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
              From raw data to a live API in under a minute.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
            {steps.map((step, i) => (
              <div key={i} className="card" style={{ padding: "32px", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: "16px", right: "20px", fontFamily: "var(--font-display)", fontSize: "80px", fontWeight: 800, color: "var(--border-subtle)", lineHeight: 1, userSelect: "none", letterSpacing: "-0.05em" }}>{step.number}</div>
                <div style={{ width: "44px", height: "44px", background: "var(--brand-50)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px", border: "1px solid var(--brand-100)" }}>
                  <step.icon size={20} style={{ color: "var(--brand-600)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "10px" }}>{step.title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.7, color: "var(--text-secondary)" }}>{step.description}</p>
                {i < 2 && (
                  <div style={{ position: "absolute", right: "-13px", top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "var(--bg-muted)", border: "1px solid var(--border-default)", borderRadius: "50%", width: "26px", height: "26px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ChevronRight size={12} style={{ color: "var(--text-tertiary)" }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "100px 24px", background: "var(--bg-subtle)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <span className="badge badge-neutral" style={{ marginBottom: "16px" }}>Platform features</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-primary)", marginBottom: "16px" }}>
              Everything you need to ship data products
            </h2>
            <p style={{ fontSize: "17px", color: "var(--text-secondary)", maxWidth: "480px", margin: "0 auto" }}>
              A complete platform for serving datasets at scale.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {features.map((f, i) => (
              <div key={i} className="card card-hover" style={{ padding: "28px" }}>
                <div style={{ width: "40px", height: "40px", background: "var(--bg-muted)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px", border: "1px solid var(--border-default)" }}>
                  <f.icon size={18} style={{ color: "var(--brand-500)" }} />
                </div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, letterSpacing: "-0.02em", color: "var(--text-primary)", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "13.5px", lineHeight: 1.65, color: "var(--text-secondary)" }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div className="card" style={{ padding: "72px 64px", textAlign: "center", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, var(--brand-950) 0%, #0f1a40 100%)", border: "none" }}>
            <div className="glow-blob" style={{ width: "400px", height: "400px", top: "-100px", left: "50%", transform: "translateX(-50%)", background: "radial-gradient(circle, rgba(45,111,255,0.3) 0%, transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", marginBottom: "16px" }}>
                Ready to transform your data?
              </h2>
              <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", maxWidth: "420px", margin: "0 auto 36px" }}>
                Join teams using DataFlow to power their applications. Start with the generous free tier.
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                <Link href="/register" style={{ textDecoration: "none" }}>
                  <button className="btn" style={{ height: "46px", padding: "0 24px", fontSize: "15px", background: "#fff", color: "var(--brand-700)", borderRadius: "var(--radius-md)" }}>
                    Start free <ArrowRight size={15} />
                  </button>
                </Link>
                <Link href="/docs" style={{ textDecoration: "none" }}>
                  <button className="btn" style={{ height: "46px", padding: "0 20px", fontSize: "15px", background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "var(--radius-md)" }}>
                    Documentation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-subtle)", padding: "60px 24px 40px" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "var(--brand-500)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Database size={15} style={{ color: "#fff" }} />
                </div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>DataFlow</span>
              </div>
              <p style={{ fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.7, maxWidth: "260px" }}>
                The modern Data-as-a-Service platform for developers and data teams.
              </p>
            </div>
            {footerCols.map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-tertiary)", marginBottom: "16px" }}>{col.heading}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <Link href={href} style={{ fontSize: "14px", color: "var(--text-secondary)", textDecoration: "none" }}>{label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>© 2026 DataFlow. All rights reserved.</span>
            <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>Built for developers who ship</span>
          </div>
        </div>
      </footer>
    </div>
  )
}