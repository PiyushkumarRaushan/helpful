"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { db, storage } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function EditOrganizationProfile() {
  const { user } = useAuth()
  const router = useRouter()

  const [orgData, setOrgData] = useState({
    name: "",
    email: "",
    website: "",
    address: "",
    profileImage: "",
  })
  const [loading, setLoading] = useState(false)
  const [imageUpload, setImageUpload] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchOrgData = async () => {
      if (!user) return
      try {
        const docRef = doc(db, "organizations", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          const data = docSnap.data() as typeof orgData
          setOrgData(data)
          setPreview(data.profileImage || null)
        }
      } catch (err) {
        console.error(err)
        setError("Failed to fetch profile data.")
      }
    }
    fetchOrgData()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOrgData({ ...orgData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageUpload(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      if (!user) throw new Error("User not logged in.")
      const orgRef = doc(db, "organizations", user.uid)

      let profileImageUrl = orgData.profileImage

      // Upload new image if selected
      if (imageUpload) {
        const imageRef = ref(storage, `org-profile-images/${user.uid}`)
        await uploadBytes(imageRef, imageUpload)
        profileImageUrl = await getDownloadURL(imageRef)
      }

      await updateDoc(orgRef, {
        ...orgData,
        profileImage: profileImageUrl,
        updatedAt: new Date(),
      })

      setSuccess("Profile updated successfully.")
    } catch (err) {
      console.error(err)
      setError("Failed to update profile.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 px-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl">Edit Organization Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert variant="default" className="mb-4 border-green-600">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-600">{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col items-center space-y-2">
                {preview && (
                  <Image
                    src={preview}
                    alt="Profile"
                    width={100}
                    height={100}
                    className="rounded-full object-cover border shadow"
                  />
                )}
                <Input type="file" accept="image/*" onChange={handleImageChange} />
              </div>

              <div>
                <Label htmlFor="name">Organization Name</Label>
                <Input id="name" name="name" value={orgData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={orgData.email} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="website">Website</Label>
                <Input id="website" name="website" value={orgData.website} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={orgData.address} onChange={handleChange} required />
              </div>
              <Button type="submit" className="w-full mt-4" disabled={loading}>
                {loading ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}