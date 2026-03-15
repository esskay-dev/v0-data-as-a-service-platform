import type { Metadata } from "next"
import Link from "next/link"
import { Database } from "lucide-react"

export const metadata: Metadata = {
  title: "DataFlow | Auth",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Database className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">DataFlow</span>
          </Link>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(var(--primary-rgb),0.1),transparent)]" />
      </div>

      <main className="flex min-h-screen items-center justify-center px-4 pt-16">
        {children}
      </main>
    </div>
  )
}