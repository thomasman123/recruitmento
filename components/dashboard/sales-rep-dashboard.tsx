"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock data for jobs
const MOCK_JOBS = [
  {
    id: "job1",
    title: "Senior Sales Representative",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$80,000 - $100,000",
    posted: "2 days ago",
    description: "We are looking for an experienced sales representative to join our enterprise sales team...",
    skills: ["B2B Sales", "CRM", "Negotiation"],
    applied: false,
  },
  {
    id: "job2",
    title: "Account Executive",
    company: "Growth Solutions",
    location: "Remote",
    type: "Full-time",
    salary: "$70,000 - $90,000",
    posted: "1 week ago",
    description: "Join our team as an Account Executive responsible for managing and expanding our client base...",
    skills: ["Account Management", "Sales", "Client Relations"],
    applied: false,
  },
  {
    id: "job3",
    title: "Sales Development Representative",
    company: "Innovate Software",
    location: "New York, NY",
    type: "Full-time",
    salary: "$50,000 - $65,000",
    posted: "3 days ago",
    description: "Looking for a motivated SDR to generate leads and set up meetings with potential clients...",
    skills: ["Lead Generation", "Cold Calling", "Prospecting"],
    applied: true,
  },
]

// Mock data for applications
const MOCK_APPLICATIONS = [
  {
    id: "app1",
    jobId: "job3",
    jobTitle: "Sales Development Representative",
    company: "Innovate Software",
    appliedDate: "3 days ago",
    status: "Under Review",
  },
  {
    id: "app2",
    jobId: "job4",
    jobTitle: "Territory Sales Manager",
    company: "Global Retail Solutions",
    appliedDate: "1 week ago",
    status: "Interview Scheduled",
  },
  {
    id: "app3",
    jobId: "job5",
    jobTitle: "Inside Sales Representative",
    company: "Cloud Services Inc.",
    appliedDate: "2 weeks ago",
    status: "Rejected",
  },
]

export function SalesRepDashboard() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [recommendedJobs, setRecommendedJobs] = useState<typeof MOCK_JOBS>([])
  const [applications, setApplications] = useState<typeof MOCK_APPLICATIONS>([])

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setRecommendedJobs(MOCK_JOBS)
      setApplications(MOCK_APPLICATIONS)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your job search and applications.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{applications.length}</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Invites</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="M16 18h.01" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">+1 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profile Completion</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Add more skills to reach 100%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recommended" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommended">Recommended Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle>{job.title}</CardTitle>
                  <CardDescription>
                    {job.company} • {job.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge variant="outline">{job.type}</Badge>
                    <Badge variant="outline">{job.salary}</Badge>
                    <Badge variant="secondary">{job.posted}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  {job.applied ? (
                    <Button variant="secondary" className="w-full" disabled>
                      Applied
                    </Button>
                  ) : (
                    <Link href={`/jobs/${job.id}`} className="w-full">
                      <Button className="w-full">View Job</Button>
                    </Link>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="flex justify-center">
            <Link href="/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 text-sm font-medium">
              <div>Job</div>
              <div>Company</div>
              <div>Applied</div>
              <div>Status</div>
              <div></div>
            </div>
            <div className="divide-y">
              {applications.map((application) => (
                <div key={application.id} className="grid grid-cols-5 items-center p-4">
                  <div className="font-medium">{application.jobTitle}</div>
                  <div className="text-sm">{application.company}</div>
                  <div className="text-sm text-muted-foreground">{application.appliedDate}</div>
                  <div>
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
                  <div className="flex justify-end">
                    <Link href={`/applications/${application.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/applications">
              <Button variant="outline">View All Applications</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
