"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type UserRole = "sales_rep" | "business_owner" | null
type OnboardingStatus = "not_started" | "in_progress" | "completed"

interface User {
  id: string
  email: string
  name: string
  role: UserRole
  onboardingStatus: OnboardingStatus
  profileData: Record<string, any>
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Add this function to set a cookie for the middleware
  const setAuthCookie = (userData: User | null) => {
    if (userData) {
      // Set cookie for server-side auth checks (middleware)
      document.cookie = `helios_user=${JSON.stringify(userData)}; path=/; max-age=2592000` // 30 days
    } else {
      // Clear the cookie when logging out
      document.cookie = "helios_user=; path=/; max-age=0"
    }
  }

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("helios_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setAuthCookie(userData) // Set the cookie on initial load
    }
    setIsLoading(false)
  }, [])

  // Update the signup function to ensure proper state persistence
  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name,
        role,
        onboardingStatus: "not_started",
        profileData: {},
      }

      setUser(userData)
      localStorage.setItem("helios_user", JSON.stringify(userData))
      setAuthCookie(userData) // Set the cookie for middleware

      router.push("/onboarding")
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  // Also update the login function for consistency
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // Simulating API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data - in a real app, this would come from the API
      const userData: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        email,
        name: email.split("@")[0],
        role: email.includes("business") ? "business_owner" : "sales_rep",
        onboardingStatus: "not_started",
        profileData: {},
      }

      setUser(userData)
      localStorage.setItem("helios_user", JSON.stringify(userData))
      setAuthCookie(userData) // Set the cookie for middleware

      router.push(userData.onboardingStatus === "completed" ? "/dashboard" : "/onboarding")
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("helios_user")
    setAuthCookie(null) // Clear the cookie
    router.push("/")
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("helios_user", JSON.stringify(updatedUser))
      setAuthCookie(updatedUser) // Update the cookie
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
