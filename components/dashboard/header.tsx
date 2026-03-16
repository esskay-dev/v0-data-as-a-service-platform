"use client"

import { Bell, Search } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function DashboardHeader() {
  const router = useRouter()
  const [user, setUser] = useState<{ name: string; email: string; initials: string } | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const name = data.user.user_metadata?.full_name || data.user.email || "User"
        const email = data.user.email || ""
        const initials = name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
        setUser({ name, email, initials })
      }
    })
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header style={{
      height: "60px",
      display: "flex",
      alignItems: "center",
      gap: "16px",
      padding: "0 24px",
      borderBottom: "1px solid var(--border-subtle)",
      background: "var(--bg-base)",
      flexShrink: 0,
    }}>
      {/* Search */}
      <div style={{ position: "relative", flex: 1, maxWidth: "320px" }}>
        <Search size={14} style={{
          position: "absolute", left: "10px", top: "50%",
          transform: "translateY(-50%)", color: "var(--text-tertiary)",
          pointerEvents: "none",
        }} />
        <input
          className="input"
          placeholder="Search datasets, APIs..."
          style={{ paddingLeft: "32px", height: "34px", fontSize: "13.5px" }}
        />
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "4px" }}>
        <ThemeToggle />

        {/* Notifications */}
        <button style={{
          position: "relative", width: "34px", height: "34px",
          borderRadius: "var(--radius-md)", border: "none",
          background: "transparent", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--text-secondary)", transition: "all 0.12s ease",
        }}
          onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-muted)"; e.currentTarget.style.color = "var(--text-primary)" }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text-secondary)" }}
        >
          <Bell size={16} />
          <span style={{
            position: "absolute", top: "7px", right: "7px",
            width: "6px", height: "6px", borderRadius: "50%",
            background: "var(--brand-500)",
            border: "1.5px solid var(--bg-base)",
          }} />
        </button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button style={{
              display: "flex", alignItems: "center", gap: "8px",
              padding: "4px 8px 4px 4px",
              borderRadius: "var(--radius-md)", border: "1px solid transparent",
              background: "transparent", cursor: "pointer",
              transition: "all 0.12s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-muted)"; e.currentTarget.style.borderColor = "var(--border-default)" }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent" }}
            >
              <div style={{
                width: "28px", height: "28px", borderRadius: "var(--radius-md)",
                background: "var(--brand-100)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "11px", fontWeight: 600, color: "var(--brand-700)",
                fontFamily: "var(--font-display)",
              }}>
                {user?.initials || "??"}
              </div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--text-primary)", lineHeight: 1.2 }}>
                  {user?.name?.split(" ")[0] || "..."}
                </div>
                <div style={{ fontSize: "11px", color: "var(--text-tertiary)", lineHeight: 1.2 }}>Free plan</div>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" style={{ width: "220px" }}>
            <DropdownMenuLabel style={{ fontWeight: "normal" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "13.5px", fontWeight: 500 }}>{user?.name || "Loading..."}</span>
                <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>{user?.email}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings" style={{ fontSize: "13.5px" }}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pricing" style={{ fontSize: "13.5px" }}>Upgrade plan</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} style={{ fontSize: "13.5px", color: "var(--accent-rose)", cursor: "pointer" }}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}