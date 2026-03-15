import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LandingHeader } from "@/components/landing/header"
import { 
  Database, 
  Upload, 
  Code2, 
  BarChart3, 
  Shield, 
  Zap,
  ArrowRight,
  CheckCircle2,
  Layers,
  GitBranch,
  Search,
  FileJson
} from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Easy Data Upload",
    description: "Upload CSV, JSON, or connect directly to your existing databases. Automatic schema detection handles the rest."
  },
  {
    icon: Code2,
    title: "Instant REST APIs",
    description: "Every dataset becomes a fully-featured REST API with filtering, pagination, and search out of the box."
  },
  {
    icon: BarChart3,
    title: "Built-in Analytics",
    description: "Visualize your data with interactive charts and dashboards. Understand your data at a glance."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "API key management, rate limiting, and role-based access control keep your data secure."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Optimized query engine delivers sub-100ms response times even for complex queries."
  },
  {
    icon: Layers,
    title: "Dataset Versioning",
    description: "Track changes to your datasets over time. Roll back to any previous version instantly."
  }
]

const pipelineFeatures = [
  {
    icon: CheckCircle2,
    title: "Automatic Validation",
    description: "Data is validated on upload against defined schemas"
  },
  {
    icon: GitBranch,
    title: "Data Cleaning Pipeline",
    description: "Built-in tools to clean and transform your data"
  },
  {
    icon: Search,
    title: "Schema Detection",
    description: "Intelligent detection of data types and relationships"
  },
  {
    icon: FileJson,
    title: "Format Conversion",
    description: "Convert between CSV, JSON, and other formats"
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Database className="size-4" />
            <span>Data-as-a-Service Platform</span>
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Transform Your Data Into{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Powerful APIs
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Upload your datasets and instantly generate REST API endpoints. 
            No backend code required. Built-in validation, versioning, and analytics.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/register">
                Get Started Free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/login">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="border-y bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                From Upload to API in Seconds
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground">
                Simply upload your data file and DataFlow automatically creates a fully-featured 
                REST API with documentation, authentication, and monitoring built in.
              </p>
              <ul className="space-y-3">
                {["Auto-generated endpoints", "Built-in filtering & pagination", "Interactive API documentation", "Real-time usage analytics"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border bg-card p-1 shadow-lg">
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
                <div className="size-3 rounded-full bg-destructive/60" />
                <div className="size-3 rounded-full bg-chart-4/60" />
                <div className="size-3 rounded-full bg-accent/60" />
                <span className="ml-2 text-xs text-muted-foreground">API Request</span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm">
                <code className="font-mono text-foreground">
{`GET /api/v1/datasets/users

{
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@example.com",
      "created_at": "2024-01-15"
    },
    {
      "id": 2,
      "name": "Bob Smith",
      "email": "bob@example.com",
      "created_at": "2024-01-16"
    }
  ],
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total": 1250
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need to Manage Data
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              A complete platform for uploading, transforming, and serving your datasets as APIs.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="size-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Data Pipeline Section */}
      <section className="border-y bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Powerful Data Pipeline
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Built-in tools to validate, clean, and transform your data before serving.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pipelineFeatures.map((feature, index) => (
              <div key={feature.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <feature.icon className="size-6" />
                  </div>
                  <h3 className="mb-2 font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
                {index < pipelineFeatures.length - 1 && (
                  <div className="absolute right-0 top-7 hidden h-0.5 w-full translate-x-1/2 bg-border lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mb-8 text-pretty text-muted-foreground">
            Join thousands of developers and data teams using DataFlow to power their applications.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/register">
                Create Free Account
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                View Documentation
              </Link>
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
