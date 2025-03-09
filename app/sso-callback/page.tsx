"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function SSOCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    // This page is only a redirect target for OAuth flows
    // The Clerk client will handle the OAuth callback and redirect to the dashboard
    const redirectToApp = setTimeout(() => {
      router.push("/dashboard")
    }, 2000)

    return () => clearTimeout(redirectToApp)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <h1 className="text-2xl font-bold">Signing you in...</h1>
        <p className="text-muted-foreground">You will be redirected automatically.</p>
      </div>
    </div>
  )
}

