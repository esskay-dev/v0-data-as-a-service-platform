import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LandingHeader } from "@/components/landing/header"
import { 
  Database, 
  Upload, 
  Code2, 
  Key,
  ArrowRight,
  CheckCircle2,
  FileJson,
  Table,
  Zap,
  BookOpen
} from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Key,
    title: "Create Your Account",
    description: "Sign up for a free account to get started. No credit card required for the free tier.",
    details: [
      "Email verification for security",
      "Choose your organization name",
      "Set up your workspace"
    ]
  },
  {
    number: "02",
    icon: Upload,
    title: "Upload Your Data",
    description: "Upload your datasets in CSV, JSON, or Excel format. Our platform automatically detects schemas.",
    details: [
      "Drag and drop file upload",
      "Automatic schema detection",
      "Data validation on upload"
    ]
  },
  {
    number: "03",
    icon: Code2,
    title: "Access Your API",
    description: "Get instant REST API endpoints for your data with authentication keys.",
    details: [
      "Auto-generated API documentation",
      "Secure API key management",
      "Built-in rate limiting"
    ]
  },
  {
    number: "04",
    icon: Zap,
    title: "Integrate & Scale",
    description: "Use your APIs in any application and scale as your needs grow.",
    details: [
      "SDKs for popular languages",
      "Webhook integrations",
      "Real-time analytics"
    ]
  }
]

const quickActions = [
  {
    icon: FileJson,
    title: "Upload a CSV",
    description: "Start with a simple CSV file upload",
    href: "/dashboard/upload",
    color: "bg-primary/10 text-primary"
  },
  {
    icon: Table,
    title: "Browse Sample Datasets",
    description: "Explore pre-loaded example datasets",
    href: "/dashboard/datasets",
    color: "bg-accent/10 text-accent"
  },
  {
    icon: BookOpen,
    title: "Read the Docs",
    description: "Learn about all features and APIs",
    href: "/docs",
    color: "bg-chart-3/10 text-chart-3"
  }
]

export default function GetStartedPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-24 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
            <Database className="size-4" />
            <span>Quick Start Guide</span>
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Get Started with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              DataFlow
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Follow these simple steps to transform your data into powerful APIs in minutes.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/signup">
                Create Free Account
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/docs">
                View Full Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Four Simple Steps
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              From signup to serving data via API in under 5 minutes.
            </p>
          </div>
          
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute left-8 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:-translate-x-1/2 lg:block" />
            
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={step.number}
                  className={`relative flex flex-col gap-6 lg:flex-row lg:items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Number Circle */}
                  <div className="absolute left-0 hidden size-16 items-center justify-center rounded-full border-4 border-background bg-primary text-lg font-bold text-primary-foreground lg:left-1/2 lg:flex lg:-translate-x-1/2">
                    {step.number}
                  </div>
                  
                  {/* Content Card */}
                  <div className={`flex-1 ${index % 2 === 1 ? "lg:pr-24" : "lg:pl-24"}`}>
                    <Card className="transition-shadow hover:shadow-lg">
                      <CardHeader>
                        <div className="mb-2 flex items-center gap-4">
                          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 lg:hidden">
                            <span className="text-sm font-bold text-primary">{step.number}</span>
                          </div>
                          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
                            <step.icon className="size-6 text-primary" />
                          </div>
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                        <CardDescription className="text-base">
                          {step.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {step.details.map((detail) => (
                            <li key={detail} className="flex items-center gap-3 text-sm text-muted-foreground">
                              <CheckCircle2 className="size-4 shrink-0 text-accent" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="hidden flex-1 lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="border-y bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Quick Actions
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-muted-foreground">
              Jump right in with these common starting points.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader>
                    <div className={`mb-4 flex size-14 items-center justify-center rounded-xl ${action.color}`}>
                      <action.icon className="size-7" />
                    </div>
                    <CardTitle className="text-lg">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <span>Get started</span>
                      <ArrowRight className="size-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="px-4 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Start Using Your API Immediately
              </h2>
              <p className="mb-6 text-pretty text-muted-foreground">
                Once your data is uploaded, you can start making API calls right away. 
                Here is a simple example using cURL.
              </p>
              <ul className="mb-6 space-y-3">
                {[
                  "Authentication via API keys",
                  "Full CRUD operations",
                  "Filtering and pagination",
                  "Rate limiting included"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="size-5 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild>
                <Link href="/docs" className="gap-2">
                  View API Reference
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-xl border bg-card shadow-lg">
              <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                <div className="size-3 rounded-full bg-destructive/60" />
                <div className="size-3 rounded-full bg-chart-4/60" />
                <div className="size-3 rounded-full bg-accent/60" />
                <span className="ml-2 text-xs text-muted-foreground">Terminal</span>
              </div>
              <pre className="overflow-x-auto p-4 text-sm">
                <code className="font-mono text-foreground">
{`# Fetch all records
curl -X GET \\
  https://api.dataflow.io/v1/datasets/users \\
  -H "Authorization: Bearer YOUR_API_KEY"

# Response
{
  "data": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ],
  "meta": {
    "total": 150,
    "page": 1,
    "per_page": 10
  }
}`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t bg-muted/30 px-4 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Build?
          </h2>
          <p className="mb-8 text-pretty text-muted-foreground">
            Create your free account and start transforming your data into APIs today.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="gap-2">
              <Link href="/signup">
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
