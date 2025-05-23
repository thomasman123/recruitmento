"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { LoadingSpinner } from "@/components/loading-spinner"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

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
  {
    id: "job4",
    title: "Territory Sales Manager",
    company: "Global Retail Solutions",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    posted: "5 days ago",
    description: "Seeking a Territory Sales Manager to oversee sales operations in the Midwest region...",
    skills: ["Territory Management", "Team Leadership", "Strategic Planning"],
    applied: false,
  },
  {
    id: "job5",
    title: "Inside Sales Representative",
    company: "Cloud Services Inc.",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$55,000 - $75,000",
    posted: "1 week ago",
    description: "Join our inside sales team to drive new business through outbound calls and follow-ups...",
    skills: ["Cold Calling", "Lead Qualification", "CRM"],
    applied: false,
  },
  {
    id: "job6",
    title: "Sales Manager",
    company: "Financial Services Group",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    posted: "2 weeks ago",
    description: "Looking for an experienced Sales Manager to lead our team of financial advisors...",
    skills: ["Team Management", "Financial Services", "Sales Strategy"],
    applied: false,
  },
]

export default function JobsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [jobs, setJobs] = useState<typeof MOCK_JOBS>([])
  const [filteredJobs, setFilteredJobs] = useState<typeof MOCK_JOBS>([])

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    location: "",
    jobType: "",
    remote: false,
  })

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setJobs(MOCK_JOBS)
      setFilteredJobs(MOCK_JOBS)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Apply filters
    let results = [...jobs]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower),
      )
    }

    if (filters.location) {
      results = results.filter((job) => job.location.includes(filters.location))
    }

    if (filters.jobType) {
      results = results.filter((job) => job.type === filters.jobType)
    }

    if (filters.remote) {
      results = results.filter((job) => job.location.toLowerCase().includes("remote"))
    }

    setFilteredJobs(results)
  }, [jobs, filters])

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      location: "",
      jobType: "",
      remote: false,
    })
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Browse Jobs</h1>
          <p className="text-muted-foreground mt-2">
            Find and apply to sales positions that match your skills and interests.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Job title, company, or keyword"
                    value={filters.search}
                    onChange={(e) => updateFilter("search", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, state, or country"
                    value={filters.location}
                    onChange={(e) => updateFilter("location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobType">Job Type</Label>
                  <Select value={filters.jobType} onValueChange={(value) => updateFilter("jobType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Temporary">Temporary</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="remote"
                    checked={filters.remote}
                    onCheckedChange={(checked) => updateFilter("remote", checked)}
                  />
                  <Label htmlFor="remote" className="font-normal">
                    Remote Jobs Only
                  </Label>
                </div>
                <Button variant="outline" className="w-full" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-3 space-y-4">
            {filteredJobs.length === 0 ? (
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
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" x2="16" y1="12" y2="12" />
                  </svg>
                  <h3 className="text-xl font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    We couldn't find any jobs matching your search criteria. Try adjusting your filters or check back
                    later.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {filteredJobs.map((job) => (
                  <Card key={job.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{job.title}</CardTitle>
                          <CardDescription>
                            {job.company} • {job.location}
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{job.posted}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        <Badge variant="outline">{job.type}</Badge>
                        <Badge variant="outline">{job.salary}</Badge>
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
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
