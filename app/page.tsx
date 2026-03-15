import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  FileJson,
  Globe,
  Clock,
  Lock,
  Sparkles,
  Play,
} from "lucide-react"

const features = [
  {
    icon: Upload,
    title: "Effortless Data Upload",
    description: "Drag and drop CSV, JSON, or Parquet files. Connect to databases. Automatic schema detection handles everything."
  },
  {
    icon: Code2,
    title: "Instant REST APIs",
    description: "Every dataset becomes a production-ready REST API with filtering, pagination, sorting, and full-text search."
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description: "Monitor API usage, track performance metrics, and visualize data trends with built-in dashboards."
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "API key management, rate limiting, IP allowlisting, and SOC 2 compliant infrastructure."
  },
  {
    icon: Zap,
    title: "Sub-50ms Latency",
    description: "Globally distributed edge caching delivers blazing fast responses for any query complexity."
  },
  {
    icon: Layers,
    title: "Version Control",
    description: "Track every change to your datasets. Compare versions, roll back instantly, audit with confidence."
  }
]

const steps = [
  {
    number: "01",
    title: "Upload Your Data",
    description: "Drop your files or connect your database. We support CSV, JSON, Parquet, and direct database connections.",
    icon: Upload,
  },
  {
    number: "02",
    title: "Automatic API Generation",
    description: "We analyze your schema, optimize indexes, and generate RESTful endpoints with full documentation.",
    icon: Code2,
  },
  {
    number: "03",
    title: "Query & Integrate",
    description: "Use your API key to fetch data from anywhere. Filter, sort, paginate - all with simple query parameters.",
    icon: Globe,
  }
]

const benefits = [
  {
    title: "For Developers",
    items: [
      "No backend code to write or maintain",
      "Auto-generated TypeScript types",
      "OpenAPI/Swagger documentation",
      "Webhook notifications for data changes",
    ],
    icon: Code2,
  },
  {
    title: "For Data Teams",
    items: [
      "Self-service data publishing",
      "Automated data validation pipelines",
      "Collaboration with version history",
      "Usage analytics per dataset",
    ],
    icon: Database,
  },
  {
    title: "For Organizations",
    items: [
      "Centralized data governance",
      "Role-based access control",
      "Audit logs and compliance reports",
      "Cost-effective scaling",
    ],
    icon: Shield,
  }
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-28 pb-20 md:pt-36 md:pb-32">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--primary-rgb),0.15),transparent)]" />
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/5 to-transparent" />
        </div>
        
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            {/* Badge */}
            <Badge variant="outline" className="mb-6 gap-2 px-4 py-1.5 text-sm font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              Now with AI-powered schema detection
            </Badge>
            
            {/* Headline */}
            <h1 className="mb-6 max-w-4xl text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Turn Your Data Into
              <span className="relative mx-3 inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Production APIs
                </span>
                <span className="absolute -inset-1 -z-10 block -skew-y-1 bg-primary/10 rounded" />
              </span>
              in Minutes
            </h1>
            
            {/* Subheadline */}
            <p className="mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
              Upload any dataset and instantly get a fully-featured REST API. 
              No backend development, no infrastructure management. 
              Just data that works.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button size="lg" className="h-12 gap-2 px-8 text-base" asChild>
                <Link href="/signup">
                  Start Building Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base" asChild>
                <Link href="/docs">
                  <Play className="h-4 w-4" />
                  Watch Demo
                </Link>
              </Button>
            </div>
            
            {/* Trust indicators */}
            <p className="mt-8 text-sm text-muted-foreground">
              Free tier available. No credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Clock className="mr-1.5 h-3 w-3" />
                Setup in under 60 seconds
              </Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                From Upload to API in Seconds
              </h2>
              <p className="mb-8 text-pretty text-lg text-muted-foreground">
                Upload your dataset and DataFlow automatically creates a production-ready 
                REST API with authentication, rate limiting, and real-time documentation.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: CheckCircle2, text: "Auto-generated REST endpoints" },
                  { icon: Search, text: "Built-in filtering, sorting & pagination" },
                  { icon: FileJson, text: "Interactive API documentation" },
                  { icon: BarChart3, text: "Real-time usage analytics" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <item.icon className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-50 blur-2xl" />
              <div className="relative overflow-hidden rounded-xl border bg-card shadow-2xl">
                <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground font-mono">GET /api/v1/datasets/users</span>
                </div>
                <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
                  <code className="font-mono text-foreground">
{`{
  "data": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "email": "alice@company.com",
      "role": "Engineering Lead",
      "joined": "2024-01-15"
    },
    {
      "id": 2,
      "name": "Bob Chen",
      "email": "bob@company.com",
      "role": "Product Manager",
      "joined": "2024-02-20"
    }
  ],
  "meta": {
    "total": 1250,
    "page": 1,
    "per_page": 10
  }
}`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-y bg-muted/30 px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4">How It Works</Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Three Steps to Production
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Get from raw data to a fully-featured API in minutes, not months.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-12 hidden h-px w-full translate-x-1/2 bg-border md:block" />
                )}
                <div className="relative rounded-2xl border bg-card p-8 transition-shadow hover:shadow-lg">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <span className="text-4xl font-bold text-muted-foreground/30">{step.number}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4">Features</Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need to Ship Data Products
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              A complete platform for uploading, transforming, and serving your datasets at scale.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden border-0 bg-muted/50 transition-all hover:bg-muted hover:shadow-md">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y bg-muted/30 px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <Badge variant="secondary" className="mb-4">Built For Everyone</Badge>
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Powerful for Developers, Simple for Teams
            </h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              DataFlow adapts to your workflow, whether you are a solo developer or an enterprise team.
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="rounded-2xl border bg-card p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <benefit.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-4 text-xl font-semibold">{benefit.title}</h3>
                <ul className="space-y-3">
                  {benefit.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Pipeline Section */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: CheckCircle2, title: "Validation", desc: "Auto-validate against schemas" },
                  { icon: GitBranch, title: "Cleaning", desc: "Remove duplicates & nulls" },
                  { icon: Search, title: "Detection", desc: "Infer types & relationships" },
                  { icon: Lock, title: "Encryption", desc: "PII detection & masking" },
                ].map((item) => (
                  <div key={item.title} className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="mb-1 font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <Badge variant="secondary" className="mb-4">Data Pipeline</Badge>
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Automated Data Quality at Scale
              </h2>
              <p className="mb-6 text-pretty text-lg text-muted-foreground">
                Our intelligent pipeline validates, cleans, and transforms your data automatically. 
                Catch issues before they reach production.
              </p>
              <Button asChild>
                <Link href="/docs">
                  Learn About Pipelines
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent)]" />
            <div className="relative">
              <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
                Ready to Transform Your Data?
              </h2>
              <p className="mx-auto mb-8 max-w-xl text-pretty text-lg opacity-90">
                Join thousands of teams using DataFlow to power their applications. 
                Start with our generous free tier.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" variant="secondary" className="h-12 gap-2 px-8 text-base" asChild>
                  <Link href="/signup">
                    Start Building Free
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                  <Link href="/docs">
                    Read Documentation
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Database className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">DataFlow</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                The modern Data-as-a-Service platform for developers and data teams.
              </p>
            </div>
            
            {/* Links */}
            <div>
              <h4 className="mb-4 font-semibold">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/get-started" className="transition-colors hover:text-foreground">Get Started</Link></li>
                <li><Link href="/docs" className="transition-colors hover:text-foreground">Documentation</Link></li>
                <li><Link href="/pricing" className="transition-colors hover:text-foreground">Pricing</Link></li>
                <li><Link href="/changelog" className="transition-colors hover:text-foreground">Changelog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="transition-colors hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="transition-colors hover:text-foreground">Blog</Link></li>
                <li><Link href="/careers" className="transition-colors hover:text-foreground">Careers</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="transition-colors hover:text-foreground">Privacy</Link></li>
                <li><Link href="/terms" className="transition-colors hover:text-foreground">Terms</Link></li>
                <li><Link href="/security" className="transition-colors hover:text-foreground">Security</Link></li>
                <li><Link href="/sla" className="transition-colors hover:text-foreground">SLA</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              2026 DataFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="https://twitter.com" className="text-muted-foreground transition-colors hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link href="https://github.com" className="text-muted-foreground transition-colors hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="text-muted-foreground transition-colors hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
