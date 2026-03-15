"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LandingHeader } from "@/components/landing/header"
import { 
  Database, 
  Search,
  BookOpen,
  Code2,
  Zap,
  Shield,
  Upload,
  FileJson,
  Key,
  BarChart3,
  ChevronRight,
  Copy,
  Check,
  ExternalLink
} from "lucide-react"

const categories = [
  {
    icon: Zap,
    title: "Getting Started",
    description: "Quick introduction to DataFlow",
    articles: [
      { title: "Platform Overview", href: "#overview" },
      { title: "Creating Your Account", href: "#account" },
      { title: "Your First Dataset", href: "#first-dataset" },
      { title: "Understanding API Keys", href: "#api-keys" }
    ]
  },
  {
    icon: Upload,
    title: "Data Management",
    description: "Upload and manage your datasets",
    articles: [
      { title: "Supported File Formats", href: "#formats" },
      { title: "Schema Detection", href: "#schema" },
      { title: "Data Validation", href: "#validation" },
      { title: "Dataset Versioning", href: "#versioning" }
    ]
  },
  {
    icon: Code2,
    title: "API Reference",
    description: "Complete API documentation",
    articles: [
      { title: "Authentication", href: "#auth" },
      { title: "Endpoints Overview", href: "#endpoints" },
      { title: "Filtering & Pagination", href: "#filtering" },
      { title: "Error Handling", href: "#errors" }
    ]
  },
  {
    icon: Shield,
    title: "Security",
    description: "Keep your data secure",
    articles: [
      { title: "API Key Management", href: "#key-management" },
      { title: "Rate Limiting", href: "#rate-limiting" },
      { title: "Access Control", href: "#access-control" },
      { title: "Data Encryption", href: "#encryption" }
    ]
  }
]

const codeExamples = {
  curl: `curl -X GET "https://api.dataflow.io/v1/datasets/users" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  javascript: `const response = await fetch(
  "https://api.dataflow.io/v1/datasets/users",
  {
    headers: {
      "Authorization": "Bearer YOUR_API_KEY",
      "Content-Type": "application/json"
    }
  }
);

const data = await response.json();
console.log(data);`,
  python: `import requests

response = requests.get(
    "https://api.dataflow.io/v1/datasets/users",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    }
)

data = response.json()
print(data)`
}

const endpoints = [
  {
    method: "GET",
    path: "/v1/datasets",
    description: "List all datasets",
    methodColor: "bg-accent text-accent-foreground"
  },
  {
    method: "GET",
    path: "/v1/datasets/:id",
    description: "Get a specific dataset",
    methodColor: "bg-accent text-accent-foreground"
  },
  {
    method: "POST",
    path: "/v1/datasets",
    description: "Create a new dataset",
    methodColor: "bg-chart-3 text-foreground"
  },
  {
    method: "PUT",
    path: "/v1/datasets/:id",
    description: "Update a dataset",
    methodColor: "bg-chart-4 text-foreground"
  },
  {
    method: "DELETE",
    path: "/v1/datasets/:id",
    description: "Delete a dataset",
    methodColor: "bg-destructive text-destructive-foreground"
  },
  {
    method: "GET",
    path: "/v1/datasets/:id/records",
    description: "Get dataset records",
    methodColor: "bg-accent text-accent-foreground"
  }
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="size-8"
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="size-4 text-accent" />
      ) : (
        <Copy className="size-4" />
      )}
    </Button>
  )
}

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-muted/30 px-4 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground">
            <BookOpen className="size-4" />
            <span>Documentation</span>
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl">
            DataFlow Documentation
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-muted-foreground">
            Everything you need to know about using DataFlow to transform your data into powerful APIs.
          </p>
          
          {/* Search */}
          <div className="mx-auto max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 pr-4 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-b px-4 py-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4">
          <Link 
            href="#quick-start" 
            className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Zap className="size-4 text-primary" />
            Quick Start
          </Link>
          <Link 
            href="#api-reference" 
            className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Code2 className="size-4 text-primary" />
            API Reference
          </Link>
          <Link 
            href="#authentication" 
            className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Key className="size-4 text-primary" />
            Authentication
          </Link>
          <Link 
            href="#examples" 
            className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <FileJson className="size-4 text-primary" />
            Examples
          </Link>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-4 py-16 md:py-24" id="quick-start">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              Browse by Category
            </h2>
            <p className="text-muted-foreground">
              Find what you need organized by topic.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <Card key={category.title} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <category.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article.title}>
                        <Link 
                          href={article.href}
                          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <ChevronRight className="size-4" />
                          <span>{article.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="border-y bg-muted/30 px-4 py-16 md:py-24" id="examples">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              Code Examples
            </h2>
            <p className="text-muted-foreground">
              Get started quickly with code samples in your preferred language.
            </p>
          </div>
          
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-lg">Fetching Data from Your API</CardTitle>
              <CardDescription>
                A basic example showing how to retrieve records from a dataset.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="curl" className="w-full">
                <div className="flex items-center justify-between border-b px-4">
                  <TabsList className="h-12 bg-transparent p-0">
                    <TabsTrigger 
                      value="curl" 
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      cURL
                    </TabsTrigger>
                    <TabsTrigger 
                      value="javascript"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      JavaScript
                    </TabsTrigger>
                    <TabsTrigger 
                      value="python"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                    >
                      Python
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="curl" className="mt-0">
                  <div className="relative">
                    <div className="absolute right-4 top-4">
                      <CopyButton text={codeExamples.curl} />
                    </div>
                    <pre className="overflow-x-auto p-6 text-sm">
                      <code className="font-mono text-foreground">{codeExamples.curl}</code>
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="javascript" className="mt-0">
                  <div className="relative">
                    <div className="absolute right-4 top-4">
                      <CopyButton text={codeExamples.javascript} />
                    </div>
                    <pre className="overflow-x-auto p-6 text-sm">
                      <code className="font-mono text-foreground">{codeExamples.javascript}</code>
                    </pre>
                  </div>
                </TabsContent>
                
                <TabsContent value="python" className="mt-0">
                  <div className="relative">
                    <div className="absolute right-4 top-4">
                      <CopyButton text={codeExamples.python} />
                    </div>
                    <pre className="overflow-x-auto p-6 text-sm">
                      <code className="font-mono text-foreground">{codeExamples.python}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* API Reference */}
      <section className="px-4 py-16 md:py-24" id="api-reference">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12">
            <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
              API Endpoints
            </h2>
            <p className="text-muted-foreground">
              Complete reference of all available API endpoints.
            </p>
          </div>
          
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Dataset Endpoints</CardTitle>
                  <CardDescription>
                    Base URL: https://api.dataflow.io
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/docs" className="gap-2">
                    Full Reference
                    <ExternalLink className="size-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {endpoints.map((endpoint) => (
                  <div 
                    key={`${endpoint.method}-${endpoint.path}`}
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                  >
                    <span className={`rounded px-2 py-1 text-xs font-medium ${endpoint.methodColor}`}>
                      {endpoint.method}
                    </span>
                    <code className="font-mono text-sm">{endpoint.path}</code>
                    <span className="ml-auto text-sm text-muted-foreground">
                      {endpoint.description}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="border-t bg-muted/30 px-4 py-16 md:py-24" id="authentication">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10">
                <Key className="size-6 text-primary" />
              </div>
              <h2 className="mb-4 text-2xl font-bold tracking-tight md:text-3xl">
                Authentication
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground">
                All API requests require authentication using an API key. Include your key 
                in the Authorization header of every request.
              </p>
              <ul className="mb-6 space-y-3">
                {[
                  "Generate API keys from your dashboard",
                  "Use Bearer token authentication",
                  "Keys can be revoked anytime",
                  "Set per-key rate limits"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/dashboard/api-keys" className="gap-2">
                  Manage API Keys
                  <ChevronRight className="size-4" />
                </Link>
              </Button>
            </div>
            <Card>
              <CardHeader className="border-b bg-muted/50">
                <CardTitle className="text-sm font-medium">Header Format</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <pre className="overflow-x-auto text-sm">
                  <code className="font-mono text-foreground">
{`Authorization: Bearer YOUR_API_KEY

# Example
Authorization: Bearer df_live_abc123xyz...`}
                  </code>
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <BarChart3 className="mx-auto mb-6 size-12 text-primary" />
          <h2 className="mb-4 text-balance text-2xl font-bold tracking-tight md:text-3xl">
            Need More Help?
          </h2>
          <p className="mb-8 text-pretty text-muted-foreground">
            Can not find what you are looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 px-4 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Database className="size-5 text-primary" />
            <span className="font-semibold">DataFlow</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/docs" className="transition-colors hover:text-foreground">Documentation</Link>
            <Link href="/pricing" className="transition-colors hover:text-foreground">Pricing</Link>
            <Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link>
            <Link href="/support" className="transition-colors hover:text-foreground">Support</Link>
          </nav>
          <p className="text-sm text-muted-foreground">
            2024 DataFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
