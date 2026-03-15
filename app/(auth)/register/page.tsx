"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Github, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

const passwordStrength = (password: string) => {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"]
const strengthColor = ["", "bg-red-500", "bg-yellow-500", "bg-blue-500", "bg-green-500"]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const strength = passwordStrength(form.password)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!agreed) { toast.error("Please agree to the Terms of Service."); return }
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: form.name },
        },
      })
      if (error) throw error
      toast.success("Account created! Please check your email to confirm.")
      router.push("/dashboard")
      router.refresh()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Something went wrong."
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGitHub = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  return (
    <div className="w-full max-w-md py-12">
      <Card className="border shadow-lg">
        <CardHeader className="space-y-1 pb-6">
          <CardTitle className="text-2xl font-bold tracking-tight">Create your account</CardTitle>
          <CardDescription className="text-base">Start turning your data into APIs for free</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full gap-2" type="button" onClick={handleGitHub} disabled={isLoading}>
            <Github className="h-4 w-4" />
            Continue with GitHub
          </Button>
          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
              or register with email
            </span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Jane Smith" required
                value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <Input id="email" type="email" placeholder="you@company.com" required
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isLoading} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="Min. 8 characters"
                  required minLength={8} value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  disabled={isLoading} className="pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {form.password && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColor[strength] : "bg-muted"}`} />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">Strength: <span className="font-medium">{strengthLabel[strength]}</span></p>
                </div>
              )}
            </div>
            <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Free tier includes</p>
              {["3 datasets", "10K API calls/month", "Community support"].map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <span className="text-sm">{perk}</span>
                </div>
              ))}
            </div>
            <div className="flex items-start gap-2">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} disabled={isLoading} className="mt-0.5" />
              <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal cursor-pointer">
                I agree to the{" "}
                <Link href="/terms" className="text-primary underline-offset-4 hover:underline">Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            <Button type="submit" className="w-full gap-2" disabled={isLoading || !agreed}>
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create Free Account
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center pt-0">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">Sign in</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}