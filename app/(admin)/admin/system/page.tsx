"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Server,
  Database,
  Cpu,
  HardDrive,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
} from "lucide-react"
import { toast } from "sonner"

const systemServices = [
  { name: "API Gateway", status: "operational", uptime: "99.99%", latency: "12ms" },
  { name: "Database Cluster", status: "operational", uptime: "99.97%", latency: "5ms" },
  { name: "File Storage", status: "operational", uptime: "99.99%", latency: "23ms" },
  { name: "Cache Layer", status: "degraded", uptime: "99.85%", latency: "3ms" },
  { name: "Job Queue", status: "operational", uptime: "99.95%", latency: "8ms" },
  { name: "Search Index", status: "operational", uptime: "99.92%", latency: "15ms" },
]

const resourceMetrics = [
  { name: "CPU Usage", value: 42, max: 100, unit: "%" },
  { name: "Memory", value: 6.8, max: 16, unit: "GB" },
  { name: "Storage", value: 2.4, max: 5, unit: "TB" },
  { name: "Network I/O", value: 890, max: 2000, unit: "Mbps" },
]

const recentJobs = [
  { name: "Dataset Validation", status: "completed", duration: "2m 34s", time: "5 min ago" },
  { name: "Data Pipeline Sync", status: "running", duration: "12m 45s", time: "Running" },
  { name: "Backup Task", status: "completed", duration: "45m 12s", time: "1 hour ago" },
  { name: "Index Rebuild", status: "queued", duration: "-", time: "Queued" },
  { name: "Cache Invalidation", status: "completed", duration: "0m 12s", time: "2 hours ago" },
]

export default function AdminSystemPage() {
  const handleRefresh = () => {
    toast.success("System metrics refreshed")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">System Health</h1>
          <p className="text-muted-foreground">
            Monitor system performance and service status
          </p>
        </div>
        <Button variant="outline" onClick={handleRefresh}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Overall Status */}
      <Card className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <div>
              <p className="font-medium text-green-800 dark:text-green-200">
                All Systems Operational
              </p>
              <p className="text-sm text-green-700 dark:text-green-300">
                5 of 6 services running normally. 1 service degraded.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {resourceMetrics.map((metric) => {
          const percentage = (metric.value / metric.max) * 100
          return (
            <Card key={metric.name}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {metric.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  <span className="text-muted-foreground">/ {metric.max} {metric.unit}</span>
                </div>
                <Progress value={percentage} className="mt-2 h-2" />
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Service Status
          </CardTitle>
          <CardDescription>
            Current status of all platform services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemServices.map((service, index) => (
              <div key={service.name}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {service.status === "operational" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                    )}
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Uptime: {service.uptime} | Latency: {service.latency}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={service.status === "operational" ? "secondary" : "outline"}
                    className={
                      service.status === "operational"
                        ? "text-green-600 bg-green-50 dark:bg-green-950/50"
                        : "text-amber-600 border-amber-600"
                    }
                  >
                    {service.status}
                  </Badge>
                </div>
                {index < systemServices.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Background Jobs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Background Jobs
          </CardTitle>
          <CardDescription>
            Recent and running background tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentJobs.map((job, index) => (
              <div key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{job.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Duration: {job.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{job.time}</span>
                    <Badge
                      variant="outline"
                      className={
                        job.status === "completed"
                          ? "text-green-600 border-green-600"
                          : job.status === "running"
                          ? "text-blue-600 border-blue-600"
                          : "text-muted-foreground"
                      }
                    >
                      {job.status}
                    </Badge>
                  </div>
                </div>
                {index < recentJobs.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>System Actions</CardTitle>
          <CardDescription>
            Administrative actions for system maintenance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex flex-col items-start gap-1">
                <Database className="h-5 w-5 text-primary mb-1" />
                <span className="font-medium">Clear Cache</span>
                <span className="text-xs text-muted-foreground">Invalidate all caches</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex flex-col items-start gap-1">
                <HardDrive className="h-5 w-5 text-primary mb-1" />
                <span className="font-medium">Run Backup</span>
                <span className="text-xs text-muted-foreground">Manual system backup</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex flex-col items-start gap-1">
                <Cpu className="h-5 w-5 text-primary mb-1" />
                <span className="font-medium">Restart Services</span>
                <span className="text-xs text-muted-foreground">Graceful restart</span>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex flex-col items-start gap-1">
                <Activity className="h-5 w-5 text-primary mb-1" />
                <span className="font-medium">View Logs</span>
                <span className="text-xs text-muted-foreground">System event logs</span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
