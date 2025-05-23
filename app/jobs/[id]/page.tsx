"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { LoadingSpinner } from "@/components/loading-spinner"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

// Mock job data
const MOCK_JOB = {
  id: "job1",
  title: "Senior Sales Representative",
  company: "TechCorp Inc.",
  location: "San Francisco, CA",
  type: "Full-time",
  salary: "$80,000 - $100,000",
  posted: "2 days ago",
  description: `
    We are looking for an experienced sales representative to join our enterprise sales team. The ideal candidate will have a proven track record of exceeding sales targets and building strong client relationships.
    
    Responsibilities:
    - Develop and maintain relationships with enterprise clients
    - Identify and pursue new sales opportunities
    - Create and deliver compelling sales presentations
    - Negotiate contracts and close agreements
    - Meet or exceed monthly, quarterly, and annual sales targets
    - Collaborate with the marketing and product teams
  `,
  requirements: `
    - 5+ years of experience in B2B sales, preferably in the technology sector
    - Proven track record of meeting or exceeding sales targets
    - Excellent communication and negotiation skills
    - Experience with CRM software (Salesforce preferred)
    - Bachelor's degree in Business, Marketing, or related field
    - Ability to travel up to 25% of the time
  `,
  benefits: `
    - Competitive base salary plus commission
    - Comprehensive health, dental, and vision insurance
    - 401(k) matching
    - Generous PTO policy
    - Professional development opportunities
    - Remote work flexibility
  `,
  skills: ["B2B Sales", "CRM", "Negotiation", "Account Management", "Presentations"],
  applied: false,
}

export default function JobDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [job, setJob] = useState<typeof MOCK_JOB | null>(null)
  const [coverLetter, setCoverLetter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch job data
    const fetchJob = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setJob({ ...MOCK_JOB, id: id as string })
      setIsLoading(false)
    }

    fetchJob()
  }, [id])

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update job state to show as applied
      setJob((prev) => (prev ? { ...prev, applied: true } : null))

      // Redirect to applications page after successful submission
      router.push("/applications")
    } catch (error) {
      console.error("Failed to submit application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading || !job) {
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
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Jobs
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{job.title}</CardTitle>
                    <CardDescription className="text-lg">
                      {job.company} • {job.location}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{job.posted}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{job.type}</Badge>
                  <Badge variant="outline">{job.salary}</Badge>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Job Description</h3>
                  <p className="whitespace-pre-line text-sm">{job.description}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                  <p className="whitespace-pre-line text-sm">{job.requirements}</p>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                  <p className="whitespace-pre-line text-sm">{job.benefits}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Job</CardTitle>
                <CardDescription>
                  Submit your application for {job.title} at {job.company}
                </CardDescription>
              </CardHeader>
              {job.applied ? (
                <CardContent>
                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-primary mb-4"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                    <h3 className="text-xl font-medium mb-2">Application Submitted</h3>
                    <p className="text-muted-foreground">
                      You have already applied for this position. You can view your application status in the
                      Applications section.
                    </p>
                  </div>
                </CardContent>
              ) : (
                <form onSubmit={handleApply}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Your Profile Information</h3>
                      <div className="rounded-md bg-muted p-3 text-sm">
                        <p>
                          <strong>Name:</strong> {user?.name}
                        </p>
                        <p>
                          <strong>Email:</strong> {user?.email}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Your full profile will be shared with the employer.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="coverLetter" className="text-sm font-medium">
                        Cover Letter / Additional Information
                      </label>
                      <Textarea
                        id="coverLetter"
                        placeholder="Explain why you're a good fit for this role..."
                        rows={6}
                        value={coverLetter}
                        onChange={(e) => setCoverLetter(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? <LoadingSpinner /> : "Submit Application"}
                    </Button>
                  </CardFooter>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
