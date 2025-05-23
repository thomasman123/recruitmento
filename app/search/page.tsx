"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { LoadingSpinner } from "@/components/loading-spinner"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

// Mock data for AI search results
const MOCK_SEARCH_RESULTS = [
  {
    id: "cand1",
    name: "John Smith",
    jobTitle: "Senior Sales Representative",
    location: "San Francisco, CA",
    match: 92,
    experience: "7 years",
    skills: ["B2B Sales", "CRM", "Negotiation", "Account Management"],
    highlights: [
      "Exceeded sales targets by 20% for 5 consecutive quarters",
      "Experience in enterprise software sales aligns with your requirements",
      "Strong negotiation skills and account management background",
    ],
  },
  {
    id: "cand2",
    name: "Sarah Johnson",
    jobTitle: "Account Executive",
    location: "Remote",
    match: 88,
    experience: "5 years",
    skills: ["B2B Sales", "CRM", "Presentations", "Lead Generation"],
    highlights: [
      "Background in SaaS sales matches your industry focus",
      "Remote work experience demonstrates adaptability",
      "Proven track record of building client relationships",
    ],
  },
  {
    id: "cand4",
    name: "Emily Davis",
    jobTitle: "Sales Development Representative",
    location: "New York, NY",
    match: 95,
    experience: "3 years",
    skills: ["Lead Generation", "Cold Calling", "Prospecting", "CRM"],
    highlights: [
      "Highest match score based on your requirements",
      "Expertise in lead generation would benefit your growth goals",
      "Demonstrated ability to quickly learn new products and markets",
    ],
  },
  {
    id: "cand6",
    name: "Jennifer Lee",
    jobTitle: "Senior Sales Representative",
    location: "Austin, TX",
    match: 90,
    experience: "8 years",
    skills: ["B2B Sales", "Team Leadership", "Strategic Planning", "CRM"],
    highlights: [
      "Leadership experience could help mentor junior team members",
      "Strategic planning skills align with your expansion goals",
      "Extensive CRM expertise with the systems you use",
    ],
  },
]

export default function AISearchPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof MOCK_SEARCH_RESULTS | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return

    setIsSearching(true)
    setSearchResults(null)

    try {
      // Simulate API call to OpenAI for search
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Return mock results
      setSearchResults(MOCK_SEARCH_RESULTS)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI-Powered Candidate Search</h1>
          <p className="text-muted-foreground mt-2">
            Use natural language to find the perfect candidates for your sales positions.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Search Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Describe the ideal candidate you're looking for..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" disabled={isSearching || !searchQuery.trim()}>
                  {isSearching ? <LoadingSpinner /> : "Search"}
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Example searches:</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>"Find experienced sales reps with B2B software experience"</li>
                  <li>"Show me candidates with strong negotiation skills and CRM experience"</li>
                  <li>"Sales professionals who have exceeded targets and can work remotely"</li>
                </ul>
              </div>
            </form>
          </CardContent>
        </Card>

        {isSearching && (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-muted-foreground">Searching for the best candidates...</p>
          </div>
        )}

        {searchResults && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <p className="text-muted-foreground">
              Found {searchResults.length} candidates matching your search criteria.
            </p>

            <div className="grid gap-4">
              {searchResults.map((candidate) => (
                <Card key={candidate.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-4 flex-1">
                        <div>
                          <h3 className="text-xl font-semibold">{candidate.name}</h3>
                          <p className="text-muted-foreground">
                            {candidate.jobTitle} • {candidate.location} • {candidate.experience}
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {candidate.skills.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <h4 className="font-medium">AI Highlights</h4>
                          <ul className="space-y-1">
                            {candidate.highlights.map((highlight, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-4 w-4 text-primary shrink-0 mt-0.5"
                                >
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-bold text-primary">{candidate.match}%</span>
                          <span className="text-sm text-muted-foreground">Match</span>
                        </div>
                        <Progress value={candidate.match} className="h-2 w-16" />
                        <Button className="mt-2">View Profile</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  )
}
