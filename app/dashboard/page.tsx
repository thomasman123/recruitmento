"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { SalesRepDashboard } from "@/components/dashboard/sales-rep-dashboard"
import { BusinessOwnerDashboard } from "@/components/dashboard/business-owner-dashboard"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function DashboardPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user?.onboardingStatus !== "completed") {
      router.push("/onboarding")
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <DashboardShell>{user.role === "sales_rep" ? <SalesRepDashboard /> : <BusinessOwnerDashboard />}</DashboardShell>
  )
}
