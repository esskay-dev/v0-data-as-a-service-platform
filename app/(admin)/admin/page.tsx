"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Database,
  Activity,
  HardDrive,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from "recharts"

const systemStats = [
  {
    title: "Total Users",
    value: "2,847",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Total Datasets",
    value: "15,423",
    change: "+8%",
    trend: "up",
    icon: Database,
  },
  {
    title: "API Requests",
    value: "4.2M",
    change: "+23%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Storage Used",
    value: "2.4 TB",
    change: "+5%",
    trend: "up",
    icon: HardDrive,
  },
]

const requestsData = [
  { date: "Mon", requests: 145000 },
  { date: "Tue", requests: 132000 },
  { date: "Wed", requests: 189000 },
  { date: "Thu", requests: 156000 },
  { date: "Fri", requests: 198000 },
  { date: "Sat", requests: 87000 },
  { date: "Sun", requests: 92000 },
]

const userActivityData = [
  { hour: "00", active: 120 },
  { hour: "04", active: 45 },
  { hour: "08", active: 890 },
  { hour: "12", active: 1200 },
  { hour: "16", active: 980 },
  { hour: "20", active: 650 },
]

const recentAlerts = [
  {
    type: "warning",
    message: "High API traffic detected from IP 192.168.1.100",
    time: "5 minutes ago",
  },
  {
    type: "error",
    message: "Dataset validation failed: user_analytics_v2",
    time: "12 minutes ago",
  },
  {
    type: "success",
    message: "System backup completed successfully",
    time: "1 hour ago",
  },
  {
    type: "warning",
    message: "Storage usage exceeded 80% threshold",
    time: "2 hours ago",
  },
]

const topUsers = [
  { name: "Acme Corp", datasets: 245, requests: "1.2M" },
  { name: "TechStart Inc", datasets: 189, requests: "890K" },
  { name: "DataDriven LLC", datasets: 156, requests: "654K" },
  { name: "Analytics Pro", datasets: 134, requests: "521K" },
  { name: "InsightHub", datasets: 98, requests: "412K" },
]

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
  active: {
    label: "Active Users",
    color: "var(--chart-2)",
  },
}

export default function AdminPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>
        <p className="text-muted-foreground">
          Monitor system health, user activity, and platform metrics
        </p>
      </div>

      {/* System Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {systemStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">{stat.value}</span>
                <span
                  className={`flex items-center text-xs font-medium ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {stat.trend === "up" ? (
                    <TrendingUp className="mr-1 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-1 h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>API Requests</CardTitle>
            <CardDescription>Total requests over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={requestsData}>
                  <defs>
                    <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="requests"
                    stroke="var(--chart-1)"
                    fill="url(#fillRequests)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
            <CardDescription>Users active by hour (UTC)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData}>
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="active" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Alerts and Top Users */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>System notifications and warnings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3">
                  {alert.type === "error" ? (
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      alert.type === "error"
                        ? "text-destructive border-destructive"
                        : alert.type === "warning"
                        ? "text-amber-600 border-amber-600"
                        : "text-green-600 border-green-600"
                    }
                  >
                    {alert.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Users</CardTitle>
            <CardDescription>Users with highest activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topUsers.map((user, index) => (
                <div key={user.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-muted-foreground w-4">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.datasets} datasets
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{user.requests} req</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
