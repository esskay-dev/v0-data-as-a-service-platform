"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Users,
  Database,
  Zap,
  Globe,
  Clock,
} from "lucide-react"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const overviewStats = [
  {
    title: "Total API Requests",
    value: "4.2M",
    change: "+23.5%",
    trend: "up",
    description: "vs last month",
    icon: Activity,
  },
  {
    title: "Avg Response Time",
    value: "45ms",
    change: "-12%",
    trend: "up",
    description: "faster than last month",
    icon: Zap,
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+8.2%",
    trend: "up",
    description: "vs last month",
    icon: Users,
  },
  {
    title: "Dataset Growth",
    value: "+1,234",
    change: "+15%",
    trend: "up",
    description: "new datasets this month",
    icon: Database,
  },
]

const requestsOverTime = [
  { date: "Jan 1", requests: 145000, errors: 1200 },
  { date: "Jan 5", requests: 168000, errors: 980 },
  { date: "Jan 10", requests: 189000, errors: 1450 },
  { date: "Jan 15", requests: 210000, errors: 1100 },
  { date: "Jan 20", requests: 195000, errors: 890 },
  { date: "Jan 25", requests: 235000, errors: 1350 },
  { date: "Jan 30", requests: 248000, errors: 1200 },
]

const responseTimeData = [
  { hour: "00:00", p50: 35, p95: 89, p99: 145 },
  { hour: "04:00", p50: 28, p95: 72, p99: 120 },
  { hour: "08:00", p50: 45, p95: 112, p99: 189 },
  { hour: "12:00", p50: 52, p95: 125, p99: 210 },
  { hour: "16:00", p50: 48, p95: 118, p99: 195 },
  { hour: "20:00", p50: 42, p95: 98, p99: 165 },
]

const endpointUsage = [
  { endpoint: "GET /datasets", calls: 1800000 },
  { endpoint: "POST /query", calls: 1200000 },
  { endpoint: "GET /schema", calls: 650000 },
  { endpoint: "POST /upload", calls: 420000 },
  { endpoint: "DELETE /datasets", calls: 130000 },
]

const trafficByRegion = [
  { name: "North America", value: 42, color: "var(--chart-1)" },
  { name: "Europe", value: 28, color: "var(--chart-2)" },
  { name: "Asia Pacific", value: 18, color: "var(--chart-3)" },
  { name: "South America", value: 8, color: "var(--chart-4)" },
  { name: "Other", value: 4, color: "var(--chart-5)" },
]

const topConsumers = [
  { name: "Acme Corp", requests: "1.2M", percentage: 28.5 },
  { name: "TechStart Inc", requests: "890K", percentage: 21.2 },
  { name: "DataDriven LLC", requests: "654K", percentage: 15.6 },
  { name: "Analytics Pro", requests: "521K", percentage: 12.4 },
  { name: "InsightHub", requests: "412K", percentage: 9.8 },
]

const chartConfig = {
  requests: {
    label: "Requests",
    color: "var(--chart-1)",
  },
  errors: {
    label: "Errors",
    color: "var(--destructive)",
  },
  p50: {
    label: "p50",
    color: "var(--chart-2)",
  },
  p95: {
    label: "p95",
    color: "var(--chart-3)",
  },
  p99: {
    label: "p99",
    color: "var(--chart-4)",
  },
  calls: {
    label: "API Calls",
    color: "var(--chart-1)",
  },
}

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Platform usage metrics and performance insights
          </p>
        </div>
        <Select defaultValue="30d">
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {overviewStats.map((stat) => (
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
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Requests Over Time */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>API Requests Over Time</CardTitle>
            <CardDescription>Total requests and errors over the selected period</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <AreaChart data={requestsOverTime}>
                <defs>
                  <linearGradient id="fillRequestsAnalytics" x1="0" y1="0" x2="0" y2="1">
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
                  fill="url(#fillRequestsAnalytics)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Response Time Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Response Time</CardTitle>
            <CardDescription>Latency percentiles by hour (UTC)</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <LineChart data={responseTimeData}>
                <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `${value}ms`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="p50"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p95"
                  stroke="var(--chart-3)"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="p99"
                  stroke="var(--chart-4)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
            <div className="mt-4 flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[var(--chart-2)]" />
                <span className="text-sm text-muted-foreground">p50</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[var(--chart-3)]" />
                <span className="text-sm text-muted-foreground">p95</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-[var(--chart-4)]" />
                <span className="text-sm text-muted-foreground">p99</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Endpoint Usage */}
        <Card>
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
            <CardDescription>Most frequently called API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart data={endpointUsage} layout="vertical">
                <XAxis
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value / 1000000}M`}
                />
                <YAxis
                  type="category"
                  dataKey="endpoint"
                  tickLine={false}
                  axisLine={false}
                  width={120}
                  tick={{ fontSize: 12 }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="calls" fill="var(--chart-1)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Traffic by Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Traffic by Region
            </CardTitle>
            <CardDescription>Geographic distribution of API requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <ChartContainer config={{}} className="h-[180px] w-[180px]">
                <PieChart>
                  <Pie
                    data={trafficByRegion}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {trafficByRegion.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
              <div className="flex-1 space-y-2">
                {trafficByRegion.map((region) => (
                  <div key={region.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                      <span className="text-sm">{region.name}</span>
                    </div>
                    <span className="text-sm font-medium">{region.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Consumers */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Top API Consumers
            </CardTitle>
            <CardDescription>Users with highest API usage this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topConsumers.map((consumer, index) => (
                <div key={consumer.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-muted-foreground w-4">
                        {index + 1}
                      </span>
                      <span className="font-medium">{consumer.name}</span>
                    </div>
                    <Badge variant="secondary">{consumer.requests}</Badge>
                  </div>
                  <div className="ml-7">
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${consumer.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
