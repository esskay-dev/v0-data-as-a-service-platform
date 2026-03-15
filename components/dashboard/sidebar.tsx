"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Database, LayoutDashboard, Upload, Key, BarChart3, Settings, BookOpen, HelpCircle, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Datasets", href: "/dashboard/datasets", icon: Database },
  { label: "Upload", href: "/dashboard/upload", icon: Upload },
  { label: "API Keys", href: "/dashboard/api-keys", icon: Key },
  { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, badge: "New" },
]

const bottomNavItems = [
  { label: "Documentation", href: "/docs", icon: BookOpen },
  { label: "Support", href: "/support", icon: HelpCircle },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside className={cn("relative flex h-screen flex-col border-r bg-card transition-all duration-300", collapsed ? "w-16" : "w-60")}>
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 overflow-hidden">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary">
            <Database className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="truncate text-base font-semibold">DataFlow</span>}
        </Link>
      </div>

      <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-[4.5rem] z-10 h-6 w-6 rounded-full border bg-background shadow-sm">
        <ChevronLeft className={cn("h-3 w-3 transition-transform", collapsed && "rotate-180")} />
      </Button>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2 pt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2")}
              title={collapsed ? item.label : undefined}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && (
                <>
                  <span className="flex-1 truncate">{item.label}</span>
                  {item.badge && <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.badge}</Badge>}
                </>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t p-2 space-y-1">
        {bottomNavItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                collapsed && "justify-center px-2")}
              title={collapsed ? item.label : undefined}>
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          )
        })}
      </div>

      {!collapsed && (
        <div className="border-t p-4">
          <div className="rounded-lg bg-muted/50 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">Free Plan</span>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">Free</Badge>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>API Calls</span>
                <span>2,341 / 10K</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-muted">
                <div className="h-1.5 rounded-full bg-primary" style={{ width: "23%" }} />
              </div>
            </div>
            <Link href="/pricing">
              <Button size="sm" className="w-full h-7 text-xs">Upgrade Plan</Button>
            </Link>
          </div>
        </div>
      )}
    </aside>
  )
}