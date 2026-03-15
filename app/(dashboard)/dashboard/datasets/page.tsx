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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Database,
  Upload,
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Trash2,
  Copy,
  ExternalLink,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

type DatasetStatus = "active" | "processing" | "error"

interface Dataset {
  id: string
  name: string
  description: string
  records: number
  size: string
  format: string
  status: DatasetStatus
  createdAt: string
  lastUpdated: string
  version: number
  endpoint: string
}

const datasets: Dataset[] = [
  {
    id: "1",
    name: "customer_transactions",
    description: "E-commerce transaction history with customer details",
    records: 125430,
    size: "45.2 MB",
    format: "CSV",
    status: "active",
    createdAt: "2024-01-15",
    lastUpdated: "2 hours ago",
    version: 3,
    endpoint: "/api/v1/datasets/customer_transactions",
  },
  {
    id: "2",
    name: "product_catalog",
    description: "Complete product inventory with pricing and metadata",
    records: 8542,
    size: "12.8 MB",
    format: "JSON",
    status: "active",
    createdAt: "2024-01-10",
    lastUpdated: "1 day ago",
    version: 5,
    endpoint: "/api/v1/datasets/product_catalog",
  },
  {
    id: "3",
    name: "user_analytics",
    description: "User behavior and engagement metrics",
    records: 892103,
    size: "156.4 MB",
    format: "Parquet",
    status: "processing",
    createdAt: "2024-01-08",
    lastUpdated: "3 days ago",
    version: 2,
    endpoint: "/api/v1/datasets/user_analytics",
  },
  {
    id: "4",
    name: "inventory_levels",
    description: "Real-time inventory tracking across warehouses",
    records: 3291,
    size: "2.1 MB",
    format: "CSV",
    status: "active",
    createdAt: "2024-01-05",
    lastUpdated: "1 week ago",
    version: 8,
    endpoint: "/api/v1/datasets/inventory_levels",
  },
  {
    id: "5",
    name: "sales_forecast_2024",
    description: "ML-generated sales predictions for Q1-Q4",
    records: 12000,
    size: "8.5 MB",
    format: "JSON",
    status: "error",
    createdAt: "2024-01-02",
    lastUpdated: "2 weeks ago",
    version: 1,
    endpoint: "/api/v1/datasets/sales_forecast_2024",
  },
]

const statusConfig: Record<DatasetStatus, { icon: React.ElementType; label: string; className: string }> = {
  active: { icon: CheckCircle2, label: "Active", className: "text-green-600 bg-green-50 dark:bg-green-950/50" },
  processing: { icon: Clock, label: "Processing", className: "text-amber-600 bg-amber-50 dark:bg-amber-950/50" },
  error: { icon: AlertCircle, label: "Error", className: "text-red-600 bg-red-50 dark:bg-red-950/50" },
}

export default function DatasetsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const copyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(`https://api.dataflow.io${endpoint}`)
    toast.success("Endpoint copied to clipboard")
  }

  const openPreview = (dataset: Dataset) => {
    setSelectedDataset(dataset)
    setPreviewOpen(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Datasets</h1>
          <p className="text-muted-foreground">
            Manage and explore your uploaded datasets
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/upload">
            <Upload className="mr-2 h-4 w-4" />
            Upload Dataset
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Datasets
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{datasets.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Records
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {datasets.reduce((acc, d) => acc + d.records, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Storage Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">225 MB</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>All Datasets</CardTitle>
              <CardDescription>
                {filteredDatasets.length} dataset{filteredDatasets.length !== 1 ? "s" : ""} found
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dataset</TableHead>
                  <TableHead className="hidden md:table-cell">Records</TableHead>
                  <TableHead className="hidden lg:table-cell">Size</TableHead>
                  <TableHead className="hidden sm:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Updated</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDatasets.map((dataset) => {
                  const StatusIcon = statusConfig[dataset.status].icon
                  return (
                    <TableRow key={dataset.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Database className="h-4 w-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium truncate">{dataset.name}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-[200px] lg:max-w-[300px]">
                              {dataset.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {dataset.records.toLocaleString()}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{dataset.size}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="secondary" className={statusConfig[dataset.status].className}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {statusConfig[dataset.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {dataset.lastUpdated}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openPreview(dataset)}>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => copyEndpoint(dataset.endpoint)}>
                              <Copy className="mr-2 h-4 w-4" />
                              Copy Endpoint
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              View API Docs
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              {selectedDataset?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedDataset?.description}
            </DialogDescription>
          </DialogHeader>
          
          {selectedDataset && (
            <Tabs defaultValue="schema" className="mt-4">
              <TabsList>
                <TabsTrigger value="schema">Schema</TabsTrigger>
                <TabsTrigger value="sample">Sample Data</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
              
              <TabsContent value="schema" className="mt-4">
                <div className="rounded-lg border bg-muted/30 p-4 font-mono text-sm">
                  <pre>{`{
  "id": "string",
  "customer_id": "string",
  "amount": "number",
  "currency": "string",
  "status": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}`}</pre>
                </div>
              </TabsContent>
              
              <TabsContent value="sample" className="mt-4">
                <div className="rounded-lg border overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>id</TableHead>
                        <TableHead>customer_id</TableHead>
                        <TableHead>amount</TableHead>
                        <TableHead>status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono">txn_001</TableCell>
                        <TableCell className="font-mono">cust_123</TableCell>
                        <TableCell>$125.00</TableCell>
                        <TableCell><Badge variant="secondary">completed</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono">txn_002</TableCell>
                        <TableCell className="font-mono">cust_456</TableCell>
                        <TableCell>$89.99</TableCell>
                        <TableCell><Badge variant="secondary">pending</Badge></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono">txn_003</TableCell>
                        <TableCell className="font-mono">cust_789</TableCell>
                        <TableCell>$250.00</TableCell>
                        <TableCell><Badge variant="secondary">completed</Badge></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="info" className="mt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Format</p>
                    <p className="font-medium">{selectedDataset.format}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Records</p>
                    <p className="font-medium">{selectedDataset.records.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium">{selectedDataset.size}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Version</p>
                    <p className="font-medium">v{selectedDataset.version}</p>
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-sm text-muted-foreground">API Endpoint</p>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 rounded bg-muted px-2 py-1 text-sm font-mono">
                        https://api.dataflow.io{selectedDataset.endpoint}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => copyEndpoint(selectedDataset.endpoint)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
