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

  const setAuthCookie = (userData: User | null) => {
    if (userData) {
      document.cookie = `helios_user=${JSON.stringify(userData)}; path=/; max-age=2592000`
    } else {
      document.cookie = "helios_user=; path=/; max-age=0"
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem("helios_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      setAuthCookie(userData)
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    try {
      setIsLoading(true)
      // Simulate API call
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
      setAuthCookie(userData)

      router.replace("/onboarding")
    } catch (error) {
      console.error("Signup failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

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
      setAuthCookie(userData)

      router.replace(userData.onboardingStatus === "completed" ? "/dashboard" : "/onboarding")
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
    setAuthCookie(null)
    router.replace("/")
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("helios_user", JSON.stringify(updatedUser))
      setAuthCookie(updatedUser)
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