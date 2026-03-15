import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Database, Upload, Key, BarChart3, ArrowRight, ArrowUpRight, Zap, Clock, CheckCircle2, AlertCircle } from "lucide-react"

const stats = [
  { label: "Total Datasets", value: "3", change: "+1 this month", trend: "up", icon: Database, href: "/dashboard/datasets" },
  { label: "API Calls (30d)", value: "2,341", change: "+18% vs last month", trend: "up", icon: Zap, href: "/dashboard/analytics" },
  { label: "Active API Keys", value: "2", change: "1 expiring soon", trend: "neutral", icon: Key, href: "/dashboard/api-keys" },
  { label: "Avg Response Time", value: "38ms", change: "-4ms vs last week", trend: "up", icon: BarChart3, href: "/dashboard/analytics" },
]

const recentDatasets = [
  { name: "users_2024.csv", rows: "1,250", endpoint: "/api/v1/datasets/users", status: "active", updatedAt: "2 hours ago" },
  { name: "products_catalog.json", rows: "856", endpoint: "/api/v1/datasets/products", status: "active", updatedAt: "1 day ago" },
  { name: "transactions_q1.csv", rows: "12,400", endpoint: "/api/v1/datasets/transactions", status: "processing", updatedAt: "5 mins ago" },
]

const recentActivity = [
  { message: "Dataset 'users_2024.csv' updated", time: "2h ago", type: "success" },
  { message: "New API key created", time: "1d ago", type: "info" },
  { message: "Rate limit warning on /api/v1/datasets/products", time: "2d ago", type: "warning" },
  { message: "Dataset 'transactions_q1.csv' upload started", time: "5m ago", type: "info" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here&apos;s what&apos;s happening with your data.</p>
        </div>
        <Button asChild className="gap-2">
          <Link href="/dashboard/upload">
            <Upload className="h-4 w-4" />
            Upload Dataset
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  {stat.trend === "up" && <ArrowUpRight className="h-4 w-4 text-green-500" />}
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-base font-semibold">Recent Datasets</CardTitle>
              <CardDescription>Your latest uploaded and active datasets</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
              <Link href="/dashboard/datasets">View all <ArrowRight className="h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDatasets.map((ds) => (
                <div key={ds.name} className="flex items-center justify-between rounded-lg border bg-muted/30 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{ds.name}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">{ds.endpoint}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{ds.rows} rows</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={ds.status === "active" ? "default" : "secondary"} className="text-[10px] px-2 py-0">
                      {ds.status}
                    </Badge>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />{ds.updatedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
            <CardDescription>Latest events on your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  {item.type === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                    : item.type === "warning" ? <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500" />
                    : <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />}
                  <div>
                    <p className="text-sm">{item.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
          <CardDescription>Common tasks to manage your platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Upload a Dataset", icon: Upload, href: "/dashboard/upload", desc: "CSV, JSON, Parquet" },
              { label: "Create API Key", icon: Key, href: "/dashboard/api-keys", desc: "Manage access" },
              { label: "View Analytics", icon: BarChart3, href: "/dashboard/analytics", desc: "Usage & performance" },
              { label: "Read the Docs", icon: Database, href: "/docs", desc: "Guides & API reference" },
            ].map((action) => (
              <Link key={action.label} href={action.href}>
                <div className="flex items-start gap-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                    <action.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{action.label}</p>
                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}