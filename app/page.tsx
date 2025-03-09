import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserButton, } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
  const { userId } =await auth()
  const isAuthenticated = !!userId

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <Link href="/" className="flex items-center">
          <span className="text-xl font-bold">Auth System</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="secondary">Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to Auth System</h1>
          <p className="text-muted-foreground mb-8">A complete authentication system built with Clerk and Next.js</p>
          {isAuthenticated ? (
            <Link href="/dashboard">
              <Button size="lg">Go to Dashboard</Button>
            </Link>
          ) : (
            <div className="flex gap-4 justify-center">
              <Link href="/sign-in">
                <Button variant="outline" size="lg">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="lg">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-center gap-4 md:gap-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Auth System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

