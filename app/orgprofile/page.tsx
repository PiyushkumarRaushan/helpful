"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function OrganizationProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  type OrganizationData = {
    name: string;
    email: string;
    website?: string;
    address: string;
    createdAt?: Date;
    role?: string;
  };

  const [organization, setOrganization] = useState<OrganizationData | null>(
    null
  );

  useEffect(() => {
    if (user) {
      const fetchOrganization = async () => {
        const docRef = doc(db, "organizations", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setOrganization(docSnap.data() as OrganizationData);
        }
      };
      fetchOrganization();
    }
  }, [user]);

  if (!organization) {
    return <p>Loading organization details...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="max-w-2xl w-full shadow-lg bg-white rounded-lg">
        <CardHeader className="flex flex-col items-center text-center">
          <Avatar className="h-20 w-20 bg-gray-200">
            {organization.name.charAt(0)}
          </Avatar>
          <h2 className="text-2xl font-bold mt-3">{organization.name}</h2>
          <p className="text-muted-foreground">
            {organization.mission || "Making a Difference Together!"}
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="space-y-4 p-6">
          <div>
            <p className="font-semibold">Email:</p>
            <p className="text-gray-600">{organization.email}</p>
          </div>
          <div>
            <p className="font-semibold">Website:</p>
            <p className="text-blue-600 underline">
              {organization.website || "N/A"}
            </p>
          </div>
          <div>
            <p className="font-semibold">Address:</p>
            <p className="text-gray-600">
              {organization.address || "Not Provided"}
            </p>
          </div>
          <div>
            <p className="font-semibold">Total Volunteers:</p>
            <p className="text-gray-600">{organization.volunteers || "0"}</p>
          </div>
          <div>
            <p className="font-semibold">Events Hosted:</p>
            <p className="text-gray-600">{organization.events || "0"}</p>
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex justify-between p-6">
          <Button onClick={() => router.push("/organization/edit-profile")}>
            Edit Profile
          </Button>
          <Button variant="destructive" onClick={logout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}