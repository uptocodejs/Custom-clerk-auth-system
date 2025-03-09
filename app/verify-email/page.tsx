"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useSignUp } from "@clerk/nextjs"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

const verifyEmailSchema = z.object({
  code: z.string().min(6, { message: "Verification code is required" }),
})

type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>

export default function VerifyEmailPage() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
  })

  const onSubmit = async (data: VerifyEmailFormValues) => {
    if (!isLoaded) return

    try {
      setIsLoading(true)
      setError("")

      const result = await signUp.attemptEmailAddressVerification({
        code: data.code,
      })

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId })
        router.push("/dashboard")
      } else {
        console.error("Verification failed", result)
        setError("Something went wrong. Please try again.")
      }
    } catch (err: any) {
      console.error("Error during verification:", err)
      setError(err.errors?.[0]?.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resendCode = async () => {
    if (!isLoaded) return

    try {
      setIsLoading(true)
      setError("")

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      })

      setIsLoading(false)
    } catch (err: any) {
      console.error("Error resending code:", err)
      setError(err.errors?.[0]?.message || "Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>We've sent a verification code to your email address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input id="code" placeholder="123456" disabled={isLoading} {...register("code")} />
              {errors.code && <p className="text-sm text-destructive">{errors.code.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Email
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-muted-foreground text-center w-full">
            Didn't receive a code?{" "}
            <Button variant="link" className="p-0 h-auto font-normal" onClick={resendCode} disabled={isLoading}>
              Resend code
            </Button>
          </div>
          <div className="text-sm text-muted-foreground text-center w-full">
            <Link href="/sign-in" className="text-primary underline-offset-4 hover:underline">
              Back to sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

