"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Users } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function Header() {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
      <Link href="/" className="flex items-center gap-2">
        <img src="https://www.pngall.com/wp-content/uploads/5/Helping-Hands-PNG.png"alt="Helping Hand Logo" className="h-8 w-8" />
          {/* <Users className="h-6 w-6 text-primary" /> */}
          <span className="text-xl font-bold">Helping Hand</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

          {user ? (
            <>
              <Link href="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

