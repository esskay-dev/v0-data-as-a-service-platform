"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Database, 
  Key, 
  Activity, 
  TrendingUp, 
  Upload, 
  ArrowUpRight,
  Clock
} from "lucide-react"
import Link from "next/link"
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer } from "recharts"

const stats = [
  {
    title: "Total Datasets",
    value: "12",
    description: "+2 this month",
    icon: Database,
    trend: "up",
  },
  {
    title: "API Keys",
    value: "4",
    description: "2 active, 2 inactive",
    icon: Key,
    trend: "neutral",
  },
  {
    title: "API Requests",
    value: "45.2K",
    description: "+12% from last week",
    icon: Activity,
    trend: "up",
  },
  {
    title: "Data Served",
    value: "2.4 GB",
    description: "This month",
    icon: TrendingUp,
    trend: "up",
  },
]

const recentDatasets = [
  {
    name: "customer_transactions",
    records: "125,430",
    lastUpdated: "2 hours ago",
    status: "active",
  },
  {
    name: "product_catalog",
    records: "8,542",
    lastUpdated: "1 day ago",
    status: "active",
  },
  {
    name: "user_analytics",
    records: "892,103",
    lastUpdated: "3 days ago",
    status: "processing",
  },
  {
    name: "inventory_levels",
    records: "3,291",
    lastUpdated: "1 week ago",
    status: "active",
  },
]

const chartData = [
  { date: "Mon", requests: 2400 },
  { date: "Tue", requests: 1398 },
  { date: "Wed", requests: 9800 },
  { date: "Thu", requests: 3908 },
  { date: "Fri", requests: 4800 },
  { date: "Sat", requests: 3800 },
  { date: "Sun", requests: 4300 },
]

const chartConfig = {
  requests: {
    label: "API Requests",
    color: "var(--chart-1)",
  },
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back, John</h1>
          <p className="text-muted-foreground">
            {"Here's what's happening with your datasets today."}
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Dataset
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-7">
        {/* API Usage Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>API Usage</CardTitle>
            <CardDescription>Request volume over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    tickLine={false} 
                    axisLine={false}
                    tickMargin={8}
                  />
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

        {/* Recent Datasets */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Datasets</CardTitle>
              <CardDescription>Your most recently updated datasets</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/datasets">
                View all
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDatasets.map((dataset) => (
                <div
                  key={dataset.name}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium truncate">{dataset.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {dataset.records} records
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge 
                      variant={dataset.status === "active" ? "secondary" : "outline"}
                      className={dataset.status === "processing" ? "text-amber-600" : ""}
                    >
                      {dataset.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>2.4 GB of 10 GB used</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={24} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>24% used</span>
              <span>7.6 GB available</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Rate Limit</CardTitle>
            <CardDescription>45,200 of 100,000 requests this month</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress value={45.2} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>45.2% used</span>
              <span>54,800 remaining</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks to help you get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/dashboard/upload">
                <div className="flex flex-col items-start gap-1">
                  <Upload className="h-5 w-5 text-primary mb-1" />
                  <span className="font-medium">Upload Dataset</span>
                  <span className="text-xs text-muted-foreground">CSV, JSON, or Parquet</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/dashboard/api-keys">
                <div className="flex flex-col items-start gap-1">
                  <Key className="h-5 w-5 text-primary mb-1" />
                  <span className="font-medium">Generate API Key</span>
                  <span className="text-xs text-muted-foreground">Create new credentials</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/dashboard/docs">
                <div className="flex flex-col items-start gap-1">
                  <Activity className="h-5 w-5 text-primary mb-1" />
                  <span className="font-medium">View API Docs</span>
                  <span className="text-xs text-muted-foreground">Integration guides</span>
                </div>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/dashboard/datasets">
                <div className="flex flex-col items-start gap-1">
                  <Clock className="h-5 w-5 text-primary mb-1" />
                  <span className="font-medium">Schedule Refresh</span>
                  <span className="text-xs text-muted-foreground">Automate updates</span>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
