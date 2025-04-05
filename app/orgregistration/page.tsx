"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function SignupPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  
  // Organization form state
  const [orgName, setOrgName] = useState("")
  const [orgEmail, setOrgEmail] = useState("")
  const [orgPassword, setOrgPassword] = useState("")
  const [orgWebsite, setOrgWebsite] = useState("")
  const [orgAddress, setOrgAddress] = useState("")

  const handleOrganizationSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    
    try {
      const user = await signUp(orgEmail, orgPassword, orgName)
      
      await setDoc(
        doc(db, "organizations", user.uid),
        {
          name: orgName,
          email: orgEmail,
          website: orgWebsite,
          address: orgAddress,
          createdAt: new Date(),
          role: "organization",
        },
        { merge: true }
      )
      
      router.push("/orgprofile")
    } catch (error: any) {
      console.error("Organization signup error:", error)
      setError(error.code === "auth/email-already-in-use" ? "This email is already in use. Please try another one or login." : "An error occurred during signup. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container max-w-md py-12">
        <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
            <CardDescription>Join our community to recruit volunteers</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleOrganizationSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="org-name">Organization name</Label>
                <Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-email">Email</Label>
                <Input id="org-email" type="email" value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-password">Password</Label>
                <Input id="org-password" type="password" value={orgPassword} onChange={(e) => setOrgPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-website">Website</Label>
                <Input id="org-website" type="url" value={orgWebsite} onChange={(e) => setOrgWebsite(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="org-address">Address</Label>
                <Input id="org-address" value={orgAddress} onChange={(e) => setOrgAddress(e.target.value)} required />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="org-terms" required />
                <label htmlFor="org-terms" className="text-sm font-medium">
                  I agree to the <Link href="/terms" className="text-primary underline">terms of service</Link> and <Link href="/privacy" className="text-primary underline">privacy policy</Link>
                </label>
              </div>
              <Link href="/orgprofile">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
              </Link>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-center text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary underline">Sign in</Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )  
}