"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { SalesRepOnboarding } from "@/components/onboarding/sales-rep-onboarding"
import { BusinessOwnerOnboarding } from "@/components/onboarding/business-owner-onboarding"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function OnboardingPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're sure the user isn't authenticated
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user?.onboardingStatus === "completed") {
      router.push("/dashboard")
    }
    // Don't redirect if still loading or if user exists and onboarding is not completed
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-12">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Welcome to Helios Recruitment</h1>
        <p className="text-muted-foreground">Let&apos;s set up your profile to get started</p>
      </div>

      {user.role === "sales_rep" ? <SalesRepOnboarding /> : <BusinessOwnerOnboarding />}
    </div>
  )
}
