"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/loading-spinner"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

// Mock data for candidates
const MOCK_CANDIDATES = [
  {
    id: "cand1",
    name: "John Smith",
    jobId: "job1",
    jobTitle: "Senior Sales Representative",
    location: "San Francisco, CA",
    appliedDate: "2 days ago",
    status: "New",
    match: 92,
    experience: "7 years",
    skills: ["B2B Sales", "CRM", "Negotiation", "Account Management"],
  },
  {
    id: "cand2",
    name: "Sarah Johnson",
    jobId: "job1",
    jobTitle: "Senior Sales Representative",
    location: "Remote",
    appliedDate: "1 day ago",
    status: "New",
    match: 88,
    experience: "5 years",
    skills: ["B2B Sales", "CRM", "Presentations", "Lead Generation"],
  },
  {
    id: "cand3",
    name: "Michael Brown",
    jobId: "job2",
    jobTitle: "Account Executive",
    location: "Chicago, IL",
    appliedDate: "3 days ago",
    status: "Reviewing",
    match: 76,
    experience: "4 years",
    skills: ["Account Management", "Sales", "Client Relations"],
  },
  {
    id: "cand4",
    name: "Emily Davis",
    jobId: "job3",
    jobTitle: "Sales Development Representative",
    location: "New York, NY",
    appliedDate: "1 week ago",
    status: "Interview",
    match: 95,
    experience: "3 years",
    skills: ["Lead Generation", "Cold Calling", "Prospecting", "CRM"],
  },
  {
    id: "cand5",
    name: "David Wilson",
    jobId: "job3",
    jobTitle: "Sales Development Representative",
    location: "Boston, MA",
    appliedDate: "5 days ago",
    status: "Rejected",
    match: 65,
    experience: "2 years",
    skills: ["Cold Calling", "Lead Qualification"],
  },
  {
    id: "cand6",
    name: "Jennifer Lee",
    jobId: "job1",
    jobTitle: "Senior Sales Representative",
    location: "Austin, TX",
    appliedDate: "4 days ago",
    status: "Offer",
    match: 90,
    experience: "8 years",
    skills: ["B2B Sales", "Team Leadership", "Strategic Planning", "CRM"],
  },
]

export default function ApplicationsPipelinePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [candidates, setCandidates] = useState<typeof MOCK_CANDIDATES>([])
  const [filteredCandidates, setFilteredCandidates] = useState<typeof MOCK_CANDIDATES>([])

  // Filter state
  const [filters, setFilters] = useState({
    search: "",
    job: "",
    status: "",
    minMatch: 0,
  })

  useEffect(() => {
    // Simulate API call to fetch data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCandidates(MOCK_CANDIDATES)
      setFilteredCandidates(MOCK_CANDIDATES)
      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    // Apply filters
    let results = [...candidates]

    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      results = results.filter(
        (candidate) =>
          candidate.name.toLowerCase().includes(searchLower) ||
          candidate.skills.some((skill) => skill.toLowerCase().includes(searchLower)),
      )
    }

    if (filters.job) {
      results = results.filter((candidate) => candidate.jobTitle === filters.job)
    }

    if (filters.status) {
      results = results.filter((candidate) => candidate.status === filters.status)
    }

    if (filters.minMatch > 0) {
      results = results.filter((candidate) => candidate.match >= filters.minMatch)
    }

    setFilteredCandidates(results)
  }, [candidates, filters])

  const updateFilter = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      job: "",
      status: "",
      minMatch: 0,
    })
  }

  // Group candidates by status for pipeline view
  const pipelineGroups = {
    New: filteredCandidates.filter((c) => c.status === "New"),
    Reviewing: filteredCandidates.filter((c) => c.status === "Reviewing"),
    Interview: filteredCandidates.filter((c) => c.status === "Interview"),
    Offer: filteredCandidates.filter((c) => c.status === "Offer"),
    Rejected: filteredCandidates.filter((c) => c.status === "Rejected"),
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

  // Get unique job titles for filter
  const jobTitles = Array.from(new Set(candidates.map((c) => c.jobTitle)))

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Application Pipeline</h1>
          <p className="text-muted-foreground mt-2">Manage and track candidates through your hiring pipeline.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Input
                  placeholder="Search candidates or skills"
                  value={filters.search}
                  onChange={(e) => updateFilter("search", e.target.value)}
                />
              </div>
              <div>
                <Select value={filters.job} onValueChange={(value) => updateFilter("job", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobTitles.map((job) => (
                      <SelectItem key={job} value={job}>
                        {job}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Reviewing">Reviewing</SelectItem>
                    <SelectItem value="Interview">Interview</SelectItem>
                    <SelectItem value="Offer">Offer</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select
                  value={filters.minMatch.toString()}
                  onValueChange={(value) => updateFilter("minMatch", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum match score" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Match Score</SelectItem>
                    <SelectItem value="70">70% or higher</SelectItem>
                    <SelectItem value="80">80% or higher</SelectItem>
                    <SelectItem value="90">90% or higher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(pipelineGroups).map(([status, candidates]) => (
            <div key={status} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{status}</h3>
                <Badge variant="outline">{candidates.length}</Badge>
              </div>

              {candidates.length === 0 ? (
                <Card className="border-dashed">
                  <CardContent className="p-4 text-center text-sm text-muted-foreground">No candidates</CardContent>
                </Card>
              ) : (
                candidates.map((candidate) => (
                  <Card key={candidate.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium">{candidate.name}</h4>
                        <div className="flex items-center">
                          <Progress value={candidate.match} className="h-2 w-12 mr-1" />
                          <span className="text-xs">{candidate.match}%</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{candidate.jobTitle}</div>
                      <div className="text-xs text-muted-foreground">
                        {candidate.experience} • {candidate.location}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {candidate.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {candidate.skills.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{candidate.skills.length - 2}
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground">Applied {candidate.appliedDate}</div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
