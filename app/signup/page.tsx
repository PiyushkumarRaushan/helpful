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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, AlertCircle } from "lucide-react"
import { doc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

export default function SignupPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  const [userType, setUserType] = useState("volunteer")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Volunteer form state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [location, setLocation] = useState("")

  // Organization form state
  const [orgName, setOrgName] = useState("")
  const [orgEmail, setOrgEmail] = useState("")
  const [orgPassword, setOrgPassword] = useState("")
  const [orgWebsite, setOrgWebsite] = useState("")
  const [orgAddress, setOrgAddress] = useState("")

  const handleVolunteerSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const user = await signUp(email, password, `${firstName} ${lastName}`)

      // Additional user data is already saved in the signUp function

      router.push("/profile")
    } catch (error: any) {
      console.error("Signup error:", error)
      setError(error.message || "An error occurred during signup. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOrganizationSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const user = await signUp(orgEmail, orgPassword, orgName)

      // Update the user document with organization-specific fields
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
        { merge: true },
      )

      router.push("/organization/dashboard")
    } catch (error: any) {
      console.error("Organization signup error:", error)
      setError(error.message || "An error occurred during signup. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-12">
      <Link href="/" className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Join our community to find volunteer opportunities or recruit volunteers</CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs value={userType} onValueChange={setUserType} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
              <TabsTrigger value="organization">Organization</TabsTrigger>
            </TabsList>
            <TabsContent value="volunteer">
              <form onSubmit={handleVolunteerSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                    <Input id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                    <Input id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Password must be at least 6 characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                      privacy policy
                    </Link>
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="organization">
              <form onSubmit={handleOrganizationSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="org-name">Organization name</Label>
                  <Input id="org-name" value={orgName} onChange={(e) => setOrgName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-email">Email</Label>
                  <Input
                    id="org-email"
                    type="email"
                    value={orgEmail}
                    onChange={(e) => setOrgEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-password">Password</Label>
                  <Input
                    id="org-password"
                    type="password"
                    value={orgPassword}
                    onChange={(e) => setOrgPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-muted-foreground">Password must be at least 6 characters</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-website">Website</Label>
                  <Input
                    id="org-website"
                    type="url"
                    value={orgWebsite}
                    onChange={(e) => setOrgWebsite(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="org-address">Address</Label>
                  <Input id="org-address" value={orgAddress} onChange={(e) => setOrgAddress(e.target.value)} required />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="org-terms" required />
                  <label
                    htmlFor="org-terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-primary underline">
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-primary underline">
                      privacy policy
                    </Link>
                  </label>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

