"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  MoreHorizontal,
  Eye,
  Trash2,
  Download,
  Database,
  HardDrive,
  FileJson,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
} from "lucide-react"

const allDatasets = [
  {
    id: "ds_001",
    name: "user_analytics",
    owner: "Acme Corp",
    ownerEmail: "admin@acme.com",
    rows: 125000,
    size: "45.2 MB",
    format: "JSON",
    status: "active",
    apiCalls: "234K",
    createdAt: "2024-01-15",
    lastAccessed: "2 hours ago",
  },
  {
    id: "ds_002",
    name: "product_catalog",
    owner: "TechStart Inc",
    ownerEmail: "data@techstart.io",
    rows: 8500,
    size: "12.8 MB",
    format: "CSV",
    status: "active",
    apiCalls: "156K",
    createdAt: "2024-01-12",
    lastAccessed: "5 minutes ago",
  },
  {
    id: "ds_003",
    name: "transaction_logs",
    owner: "DataDriven LLC",
    ownerEmail: "ops@datadriven.com",
    rows: 890000,
    size: "234.5 MB",
    format: "JSON",
    status: "processing",
    apiCalls: "89K",
    createdAt: "2024-01-10",
    lastAccessed: "Processing...",
  },
  {
    id: "ds_004",
    name: "customer_feedback",
    owner: "Analytics Pro",
    ownerEmail: "team@analyticspro.io",
    rows: 45000,
    size: "18.3 MB",
    format: "CSV",
    status: "error",
    apiCalls: "0",
    createdAt: "2024-01-08",
    lastAccessed: "Failed",
  },
  {
    id: "ds_005",
    name: "inventory_data",
    owner: "InsightHub",
    ownerEmail: "data@insighthub.com",
    rows: 12000,
    size: "5.6 MB",
    format: "JSON",
    status: "active",
    apiCalls: "67K",
    createdAt: "2024-01-05",
    lastAccessed: "1 day ago",
  },
  {
    id: "ds_006",
    name: "sales_metrics",
    owner: "Acme Corp",
    ownerEmail: "admin@acme.com",
    rows: 250000,
    size: "89.1 MB",
    format: "CSV",
    status: "active",
    apiCalls: "412K",
    createdAt: "2024-01-03",
    lastAccessed: "30 minutes ago",
  },
  {
    id: "ds_007",
    name: "user_events",
    owner: "TechStart Inc",
    ownerEmail: "data@techstart.io",
    rows: 1500000,
    size: "456.7 MB",
    format: "JSON",
    status: "active",
    apiCalls: "1.2M",
    createdAt: "2024-01-01",
    lastAccessed: "Just now",
  },
]

const stats = [
  { title: "Total Datasets", value: "15,423", icon: Database },
  { title: "Total Storage", value: "2.4 TB", icon: HardDrive },
  { title: "Active Datasets", value: "14,892", icon: CheckCircle2 },
  { title: "Processing", value: "31", icon: Clock },
]

export default function AdminDatasetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDataset, setSelectedDataset] = useState<typeof allDatasets[0] | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  const filteredDatasets = allDatasets.filter((dataset) => {
    const matchesSearch =
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.ownerEmail.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || dataset.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">Active</Badge>
      case "processing":
        return <Badge className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20">Processing</Badge>
      case "error":
        return <Badge variant="destructive">Error</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Datasets</h1>
        <p className="text-muted-foreground">
          Manage and monitor all datasets across the platform
        </p>
      </div>

      {/* Stats */}
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
              <span className="text-2xl font-bold">{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Datasets Table */}
      <Card>
        <CardHeader>
          <CardTitle>Dataset Management</CardTitle>
          <CardDescription>View and manage all datasets on the platform</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search datasets or owners..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dataset</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead className="hidden md:table-cell">Size</TableHead>
                  <TableHead className="hidden lg:table-cell">API Calls</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">Last Accessed</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDatasets.map((dataset) => (
                  <TableRow key={dataset.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                          <FileJson className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">{dataset.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {dataset.rows.toLocaleString()} rows
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{dataset.owner}</p>
                        <p className="text-xs text-muted-foreground">{dataset.ownerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{dataset.size}</TableCell>
                    <TableCell className="hidden lg:table-cell">{dataset.apiCalls}</TableCell>
                    <TableCell>{getStatusBadge(dataset.status)}</TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
                      {dataset.lastAccessed}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedDataset(dataset)
                              setDetailsOpen(true)
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Data
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Dataset
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dataset Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Dataset Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected dataset
            </DialogDescription>
          </DialogHeader>
          {selectedDataset && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedDataset.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {selectedDataset.id}</p>
                </div>
                {getStatusBadge(selectedDataset.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Owner</p>
                  <p className="font-medium">{selectedDataset.owner}</p>
                  <p className="text-xs text-muted-foreground">{selectedDataset.ownerEmail}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Format</p>
                  <p className="font-medium">{selectedDataset.format}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Rows</p>
                  <p className="font-medium">{selectedDataset.rows.toLocaleString()}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Size</p>
                  <p className="font-medium">{selectedDataset.size}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">API Calls</p>
                  <p className="font-medium">{selectedDataset.apiCalls}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-xs text-muted-foreground">Created</p>
                  <p className="font-medium">{selectedDataset.createdAt}</p>
                </div>
              </div>

              {selectedDataset.status === "error" && (
                <div className="flex items-start gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                  <div>
                    <p className="font-medium text-destructive">Validation Error</p>
                    <p className="text-sm text-muted-foreground">
                      This dataset failed validation. Please contact the owner to resolve the issue.
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button variant="destructive" className="flex-1">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
