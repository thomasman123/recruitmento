"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingSpinner } from "@/components/loading-spinner"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function CreateJobPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "",
    salary: "",
    description: "",
    requirements: "",
    benefits: "",
    skills: [] as string[],
    experienceLevel: "",
    remoteOption: "",
    applicationDeadline: "",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = prev[field as keyof typeof prev] as string[]
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] }
      } else {
        return { ...prev, [field]: currentValues.filter((v) => v !== value) }
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to the jobs page after successful submission
      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to create job posting:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create Job Posting</h1>
          <p className="text-muted-foreground mt-2">Fill out the form below to create a new job posting.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Provide the basic details about the job position.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g. Senior Sales Representative"
                    value={formData.title}
                    onChange={(e) => updateFormData("title", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select value={formData.type} onValueChange={(value) => updateFormData("type", value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full-time</SelectItem>
                        <SelectItem value="part-time">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="temporary">Temporary</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input
                      id="salary"
                      placeholder="e.g. $50,000 - $70,000"
                      value={formData.salary}
                      onChange={(e) => updateFormData("salary", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="remoteOption">Remote Work Option</Label>
                  <RadioGroup
                    value={formData.remoteOption}
                    onValueChange={(value) => updateFormData("remoteOption", value)}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="remote" id="remote" />
                      <Label htmlFor="remote" className="font-normal">
                        Fully Remote
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid" className="font-normal">
                        Hybrid
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="onsite" id="onsite" />
                      <Label htmlFor="onsite" className="font-normal">
                        On-site Only
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="applicationDeadline">Application Deadline</Label>
                  <Input
                    id="applicationDeadline"
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) => updateFormData("applicationDeadline", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>
                  Provide detailed information about the job responsibilities and requirements.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the job responsibilities and duties..."
                    rows={5}
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requirements">Requirements</Label>
                  <Textarea
                    id="requirements"
                    placeholder="List the qualifications and requirements for this position..."
                    rows={4}
                    value={formData.requirements}
                    onChange={(e) => updateFormData("requirements", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="benefits">Benefits</Label>
                  <Textarea
                    id="benefits"
                    placeholder="Describe the benefits and perks offered with this position..."
                    rows={3}
                    value={formData.benefits}
                    onChange={(e) => updateFormData("benefits", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skills & Experience</CardTitle>
                <CardDescription>Specify the skills and experience level required for this position.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Required Skills</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      "Prospecting",
                      "Negotiation",
                      "Closing",
                      "Account Management",
                      "CRM Software",
                      "Cold Calling",
                      "Presentations",
                      "Relationship Building",
                      "Lead Generation",
                      "Sales Strategy",
                      "Market Research",
                      "Customer Service",
                    ].map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={formData.skills.includes(skill)}
                          onCheckedChange={(checked) => handleCheckboxChange("skills", skill, checked as boolean)}
                        />
                        <Label htmlFor={`skill-${skill}`} className="font-normal">
                          {skill}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) => updateFormData("experienceLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                      <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                      <SelectItem value="senior">Senior Level (5-10 years)</SelectItem>
                      <SelectItem value="executive">Executive Level (10+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner /> : "Create Job Posting"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </DashboardShell>
  )
}
