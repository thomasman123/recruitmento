"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/loading-spinner"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

// Mock data for applications
const MOCK_APPLICATIONS = [
  {
    id: "app1",
    jobId: "job3",
    jobTitle: "Sales Development Representative",
    company: "Innovate Software",
    location: "New York, NY",
    appliedDate: "3 days ago",
    status: "Under Review",
    coverLetter: "I am excited to apply for the Sales Development Representative position at Innovate Software...",
  },
  {
    id: "app2",
    jobId: "job4",
    jobTitle: "Territory Sales Manager",
    company: "Global Retail Solutions",
    location: "Chicago, IL",
    appliedDate: "1 week ago",
    status: "Interview Scheduled",
    coverLetter: "With my experience in territory management and team leadership, I believe I would be a great fit...",
  },
  {
    id: "app3",
    jobId: "job5",
    jobTitle: "Inside Sales Representative",
    company: "Cloud Services Inc.",
    location: "Austin, TX",
    appliedDate: "2 weeks ago",
    status: "Rejected",
    coverLetter:
      "I am writing to express my interest in the Inside Sales Representative position at Cloud Services Inc...",
  },
]

export default function ApplicationsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [applications, setApplications] = useState<typeof MOCK_APPLICATIONS>([])

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setApplications(MOCK_APPLICATIONS)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardShell>
    )
  }

  const activeApplications = applications.filter((app) => app.status !== "Rejected")
  const rejectedApplications = applications.filter((app) => app.status === "Rejected")

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Applications</h1>
          <p className="text-muted-foreground mt-2">Track and manage your job applications.</p>
        </div>

        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Applications ({activeApplications.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            {activeApplications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12 text-muted-foreground mb-4"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">No active applications</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-4">
                    You don't have any active job applications at the moment.
                  </p>
                  <Link href="/jobs">
                    <Button>Browse Jobs</Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {activeApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="rejected" className="space-y-4">
            {rejectedApplications.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-12 w-12 text-muted-foreground mb-4"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" x2="16" y1="2" y2="6" />
                    <line x1="8" x2="8" y1="2" y2="6" />
                    <line x1="3" x2="21" y1="10" y2="10" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">No rejected applications</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    You don't have any rejected job applications.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {rejectedApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

function ApplicationCard({ application }: { application: (typeof MOCK_APPLICATIONS)[0] }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{application.jobTitle}</CardTitle>
            <div className="text-sm text-muted-foreground">
              {application.company} • {application.location}
            </div>
          </div>
          <Badge
            variant={
              application.status === "Rejected"
                ? "destructive"
                : application.status === "Interview Scheduled"
                  ? "default"
                  : "secondary"
            }
          >
            {application.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span>Applied: {application.appliedDate}</span>
          <Link href={`/jobs/${application.jobId}`}>
            <Button variant="ghost" size="sm">
              View Job
            </Button>
          </Link>
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Your Cover Letter</h4>
          <p className="text-sm text-muted-foreground line-clamp-3">{application.coverLetter}</p>
        </div>
      </CardContent>
    </Card>
  )
}
