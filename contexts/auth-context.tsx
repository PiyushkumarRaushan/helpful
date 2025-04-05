"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, name: string) => Promise<User>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}



const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signUp: async () => {
    throw new Error("Not implemented")
  },
  signIn: async () => {},
  logout: async () => {},
  resetPassword: async () => {},
})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, name: string): Promise<User> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      // Update profile with display name
      await updateProfile(user, {
        displayName: name,
      })

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email,
        displayName: name,
        createdAt: serverTimestamp(),
        role: "volunteer",
        totalHours: 0,
        skills: [],
        interests: [],
        location: "",
      })

      return user
    } catch (error: any) {
      console.error("Error signing up:", error)

      // Provide more specific error messages
      if (error.code === "auth/operation-not-allowed") {
        throw new Error("Email/password authentication is not enabled in Firebase. Please contact the administrator.")
      } else if (error.code === "auth/email-already-in-use") {
        throw new Error("This email is already in use. Please try another one or login.")
      } else if (error.code === "auth/weak-password") {
        throw new Error("Password is too weak. Please use a stronger password.")
      } else if (error.code === "auth/invalid-email") {
        throw new Error("Invalid email address. Please check and try again.")
      } else {
        throw error
      }
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error: any) {
      console.error("Error signing in:", error)

      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        throw new Error("Invalid email or password")
      } else if (error.code === "auth/too-many-requests") {
        throw new Error("Too many unsuccessful login attempts. Please try again later or reset your password.")
      } else {
        throw error
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Error signing out:", error)
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
    } catch (error: any) {
      console.error("Error resetting password:", error)

      if (error.code === "auth/user-not-found") {
        throw new Error("No account found with this email address")
      } else {
        throw error
      }
    }
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    logout,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

