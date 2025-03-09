"use client"

import type React from "react"

import { ClerkProvider as BaseClerkProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { useTheme } from "next-themes"

export function ClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()

  return (
    <BaseClerkProvider
      appearance={{
        baseTheme: theme === "dark" ? dark : undefined,
        elements: {
          formButtonPrimary: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2",
          card: "bg-background shadow-none",
          formFieldInput:
            "bg-background border border-input rounded-md px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          formFieldLabel: "text-foreground text-sm font-medium",
          footerActionLink: "text-primary hover:text-primary/90",
          identityPreview: "bg-muted",
          avatarBox: "rounded-full",
        },
      }}
    >
      {children}
    </BaseClerkProvider>
  )
}

