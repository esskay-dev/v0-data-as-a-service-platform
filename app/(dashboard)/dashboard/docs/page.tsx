"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Copy, Check, Play, BookOpen, Code2, Zap } from "lucide-react"
import { toast } from "sonner"

const codeExamples = {
  curl: `curl -X GET "https://api.dataflow.io/v1/datasets/customer_transactions" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  javascript: `const response = await fetch(
  'https://api.dataflow.io/v1/datasets/customer_transactions',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

const data = await response.json();
console.log(data);`,
  python: `import requests

response = requests.get(
    'https://api.dataflow.io/v1/datasets/customer_transactions',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
)

data = response.json()
print(data)`,
}

const endpoints = [
  {
    method: "GET",
    path: "/v1/datasets",
    description: "List all datasets",
    response: `{
  "datasets": [
    {
      "id": "ds_123",
      "name": "customer_transactions",
      "records": 125430,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 12,
  "page": 1
}`,
  },
  {
    method: "GET",
    path: "/v1/datasets/:id",
    description: "Get dataset details and metadata",
    response: `{
  "id": "ds_123",
  "name": "customer_transactions",
  "description": "E-commerce transaction history",
  "schema": {
    "id": "string",
    "amount": "number",
    "status": "string"
  },
  "records": 125430,
  "size_bytes": 47396044
}`,
  },
  {
    method: "GET",
    path: "/v1/datasets/:id/records",
    description: "Query records from a dataset",
    response: `{
  "records": [
    {
      "id": "txn_001",
      "customer_id": "cust_123",
      "amount": 125.00,
      "status": "completed"
    }
  ],
  "total": 125430,
  "page": 1,
  "limit": 100
}`,
  },
  {
    method: "POST",
    path: "/v1/datasets",
    description: "Create a new dataset",
    response: `{
  "id": "ds_456",
  "name": "new_dataset",
  "status": "processing",
  "upload_url": "https://upload.dataflow.io/..."
}`,
  },
  {
    method: "DELETE",
    path: "/v1/datasets/:id",
    description: "Delete a dataset",
    response: `{
  "success": true,
  "message": "Dataset deleted successfully"
}`,
  },
]

const queryParams = [
  { name: "page", type: "integer", description: "Page number for pagination (default: 1)" },
  { name: "limit", type: "integer", description: "Number of records per page (default: 100, max: 1000)" },
  { name: "sort", type: "string", description: "Field to sort by (e.g., 'created_at')" },
  { name: "order", type: "string", description: "Sort order: 'asc' or 'desc'" },
  { name: "filter", type: "object", description: "Filter conditions as JSON object" },
  { name: "fields", type: "string", description: "Comma-separated list of fields to return" },
]

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success("Code copied to clipboard")
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative">
      <pre className="rounded-lg bg-[#1e1e2e] p-4 overflow-x-auto text-sm">
        <code className="text-[#cdd6f4] font-mono">{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={copyCode}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

export default function DocsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">API Documentation</h1>
        <p className="text-muted-foreground">
          Learn how to integrate DataFlow APIs into your applications
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle>Quick Start</CardTitle>
          </div>
          <CardDescription>
            Get started with the DataFlow API in under 5 minutes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border bg-card">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-sm font-bold text-primary">1</span>
              </div>
              <h3 className="font-medium mb-1">Get API Key</h3>
              <p className="text-sm text-muted-foreground">
                Generate an API key from the API Keys page in your dashboard
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-sm font-bold text-primary">2</span>
              </div>
              <h3 className="font-medium mb-1">Upload Dataset</h3>
              <p className="text-sm text-muted-foreground">
                Upload your CSV, JSON, or Parquet file to create a dataset
              </p>
            </div>
            <div className="p-4 rounded-lg border bg-card">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <span className="text-sm font-bold text-primary">3</span>
              </div>
              <h3 className="font-medium mb-1">Query Data</h3>
              <p className="text-sm text-muted-foreground">
                Use the auto-generated REST endpoints to query your data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <CardTitle>Code Examples</CardTitle>
          </div>
          <CardDescription>
            Example requests in popular languages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="curl">
            <TabsList>
              <TabsTrigger value="curl">cURL</TabsTrigger>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            <TabsContent value="curl" className="mt-4">
              <CodeBlock code={codeExamples.curl} language="bash" />
            </TabsContent>
            <TabsContent value="javascript" className="mt-4">
              <CodeBlock code={codeExamples.javascript} language="javascript" />
            </TabsContent>
            <TabsContent value="python" className="mt-4">
              <CodeBlock code={codeExamples.python} language="python" />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* API Endpoints */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <CardTitle>API Endpoints</CardTitle>
          </div>
          <CardDescription>
            Complete reference for all available endpoints
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {endpoints.map((endpoint, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className={
                        endpoint.method === "GET"
                          ? "text-green-600 border-green-600"
                          : endpoint.method === "POST"
                          ? "text-blue-600 border-blue-600"
                          : "text-red-600 border-red-600"
                      }
                    >
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                    <span className="text-muted-foreground text-sm font-normal hidden sm:inline">
                      {endpoint.description}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pt-4 space-y-4">
                    <p className="text-sm text-muted-foreground sm:hidden">
                      {endpoint.description}
                    </p>
                    <div>
                      <p className="text-sm font-medium mb-2">Example Response</p>
                      <CodeBlock code={endpoint.response} language="json" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="mr-2 h-3 w-3" />
                      Try it out
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Query Parameters */}
      <Card>
        <CardHeader>
          <CardTitle>Query Parameters</CardTitle>
          <CardDescription>
            Optional parameters for filtering and pagination
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {queryParams.map((param) => (
              <div
                key={param.name}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono font-medium">{param.name}</code>
                  <Badge variant="outline" className="text-xs">
                    {param.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{param.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rate Limits */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limits</CardTitle>
          <CardDescription>
            API rate limits by plan tier
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg border">
              <h3 className="font-medium">Free</h3>
              <p className="text-2xl font-bold mt-2">1,000</p>
              <p className="text-sm text-muted-foreground">requests/day</p>
            </div>
            <div className="p-4 rounded-lg border border-primary bg-primary/5">
              <h3 className="font-medium">Pro</h3>
              <p className="text-2xl font-bold mt-2">100,000</p>
              <p className="text-sm text-muted-foreground">requests/day</p>
            </div>
            <div className="p-4 rounded-lg border">
              <h3 className="font-medium">Enterprise</h3>
              <p className="text-2xl font-bold mt-2">Unlimited</p>
              <p className="text-sm text-muted-foreground">requests/day</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
