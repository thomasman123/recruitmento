"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/loading-spinner"

// Mock data for job postings
const MOCK_JOB_POSTINGS = [
  {
    id: "job1",
    title: "Senior Sales Representative",
    location: "San Francisco, CA",
    type: "Full-time",
    posted: "2 days ago",
    expires: "28 days left",
    applicants: 12,
    status: "Active",
  },
  {
    id: "job2",
    title: "Account Executive",
    location: "Remote",
    type: "Full-time",
    posted: "1 week ago",
    expires: "23 days left",
    applicants: 8,
    status: "Active",
  },
  {
    id: "job3",
    title: "Sales Development Representative",
    location: "New York, NY",
    type: "Full-time",
    posted: "3 weeks ago",
    expires: "7 days left",
    applicants: 24,
    status: "Active",
  },
  {
    id: "job4",
    title: "Regional Sales Manager",
    location: "Chicago, IL",
    type: "Full-time",
    posted: "1 month ago",
    expires: "Expired",
    applicants: 18,
    status: "Expired",
  },
]

// Mock data for candidates
const MOCK_CANDIDATES = [
  {
    id: "cand1",
    name: "John Smith",
    jobId: "job1",
    jobTitle: "Senior Sales Representative",
    appliedDate: "2 days ago",
    status: "New",
    match: 92,
  },
  {
    id: "cand2",
    name: "Sarah Johnson",
    jobId: "job1",
    jobTitle: "Senior Sales Representative",
    appliedDate: "1 day ago",
    status: "New",
    match: 88,
  },
  {
    id: "cand3",
    name: "Michael Brown",
    jobId: "job2",
    jobTitle: "Account Executive",
    appliedDate: "3 days ago",
    status: "Reviewing",
    match: 76,
  },
  {
    id: "cand4",
    name: "Emily Davis",
    jobId: "job3",
    jobTitle: "Sales Development Representative",
    appliedDate: "1 week ago",
    status: "Interview",
    match: 95,
  },
  {
    id: "cand5",
    name: "David Wilson",
    jobId: "job3",
    jobTitle: "Sales Development Representative",
    appliedDate: "5 days ago",
    status: "Rejected",
    match: 65,
  },
]

export function BusinessOwnerDashboard() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [jobPostings, setJobPostings] = useState<typeof MOCK_JOB_POSTINGS>([])
  const [candidates, setCandidates] = useState<typeof MOCK_CANDIDATES>([])

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setJobPostings(MOCK_JOB_POSTINGS)
      setCandidates(MOCK_CANDIDATES)
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

  const activeJobs = jobPostings.filter((job) => job.status === "Active").length
  const totalApplicants = jobPostings.reduce((sum, job) => sum + job.applicants, 0)
  const newCandidates = candidates.filter((candidate) => candidate.status === "New").length
  const interviewStage = candidates.filter((candidate) => candidate.status === "Interview").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="text-muted-foreground mt-2">Here's what's happening with your job postings and candidates.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Job Postings</CardTitle>
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
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeJobs}</div>
            <p className="text-xs text-muted-foreground">+1 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
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
            <div className="text-2xl font-bold">{totalApplicants}</div>
            <p className="text-xs text-muted-foreground">+8 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Candidates</CardTitle>
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
            <div className="text-2xl font-bold">{newCandidates}</div>
            <p className="text-xs text-muted-foreground">+2 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interview Stage</CardTitle>
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
            <div className="text-2xl font-bold">{interviewStage}</div>
            <p className="text-xs text-muted-foreground">+1 from last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Job Postings</TabsTrigger>
          <TabsTrigger value="candidates">Recent Candidates</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex justify-end">
            <Link href="/jobs/create">
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5v14" />
                </svg>
                Post New Job
              </Button>
            </Link>
          </div>
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 text-sm font-medium">
              <div>Job Title</div>
              <div>Location</div>
              <div>Posted</div>
              <div>Expires</div>
              <div>Applicants</div>
              <div></div>
            </div>
            <div className="divide-y">
              {jobPostings.map((job) => (
                <div key={job.id} className="grid grid-cols-6 items-center p-4">
                  <div className="font-medium">{job.title}</div>
                  <div className="text-sm">{job.location}</div>
                  <div className="text-sm text-muted-foreground">{job.posted}</div>
                  <div className="text-sm text-muted-foreground">{job.expires}</div>
                  <div>
                    <Link href={`/applications?jobId=${job.id}`}>
                      <Badge>{job.applicants}</Badge>
                    </Link>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link href={`/jobs/${job.id}`}>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </Link>
                    <Link href={`/jobs/${job.id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="candidates" className="space-y-4">
          <div className="rounded-md border">
            <div className="grid grid-cols-6 p-4 text-sm font-medium">
              <div>Name</div>
              <div>Job</div>
              <div>Applied</div>
              <div>Status</div>
              <div>Match</div>
              <div></div>
            </div>
            <div className="divide-y">
              {candidates.map((candidate) => (
                <div key={candidate.id} className="grid grid-cols-6 items-center p-4">
                  <div className="font-medium">{candidate.name}</div>
                  <div className="text-sm">{candidate.jobTitle}</div>
                  <div className="text-sm text-muted-foreground">{candidate.appliedDate}</div>
                  <div>
                    <Badge
                      variant={
                        candidate.status === "Rejected"
                          ? "destructive"
                          : candidate.status === "Interview"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {candidate.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={candidate.match} className="h-2 w-16" />
                    <span className="text-sm">{candidate.match}%</span>
                  </div>
                  <div className="flex justify-end">
                    <Link href={`/candidates/${candidate.id}`}>
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
            <Link href="/applications/pipeline">
              <Button variant="outline">View Pipeline</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
