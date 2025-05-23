"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { LoadingSpinner } from "@/components/loading-spinner"

const steps = [
  { id: "company", title: "Company Information" },
  { id: "hiring", title: "Hiring Needs" },
  { id: "preferences", title: "Candidate Preferences" },
]

export function BusinessOwnerOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, updateUser } = useAuth()
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    // Company Information
    companyName: "",
    industry: "",
    companySize: "",
    companyWebsite: "",
    companyDescription: "",

    // Hiring Needs
    hiringRoles: [] as string[],
    hiringUrgency: "",
    hiringVolume: "",

    // Candidate Preferences
    requiredSkills: [] as string[],
    experienceLevel: "",
    remotePreference: "",
    additionalRequirements: "",
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

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      updateUser({
        onboardingStatus: "completed",
        profileData: formData,
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Failed to complete onboarding:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                      ? "border-2 border-primary text-primary"
                      : "border-2 border-muted-foreground text-muted-foreground"
                }`}
              >
                {index < currentStep ? "✓" : index + 1}
              </div>
              <span className="text-sm hidden md:block">{step.title}</span>
            </div>
          ))}
        </div>
        <div className="w-full bg-muted h-2 rounded-full">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Company Information</h2>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Acme Inc."
                  value={formData.companyName}
                  onChange={(e) => updateFormData("companyName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Select value={formData.industry} onValueChange={(value) => updateFormData("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companySize">Company Size</Label>
                <Select value={formData.companySize} onValueChange={(value) => updateFormData("companySize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                    <SelectItem value="1000+">1000+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyWebsite">Company Website</Label>
                <Input
                  id="companyWebsite"
                  placeholder="https://www.example.com"
                  value={formData.companyWebsite}
                  onChange={(e) => updateFormData("companyWebsite", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyDescription">Company Description</Label>
                <Textarea
                  id="companyDescription"
                  placeholder="Tell us about your company..."
                  rows={4}
                  value={formData.companyDescription}
                  onChange={(e) => updateFormData("companyDescription", e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Hiring Needs</h2>
              <div className="space-y-2">
                <Label>Hiring Roles</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Sales Representative",
                    "Account Executive",
                    "Sales Manager",
                    "Business Development",
                    "Inside Sales",
                    "Outside Sales",
                    "Sales Director",
                    "VP of Sales",
                  ].map((role) => (
                    <div key={role} className="flex items-center space-x-2">
                      <Checkbox
                        id={`role-${role}`}
                        checked={formData.hiringRoles.includes(role)}
                        onCheckedChange={(checked) => handleCheckboxChange("hiringRoles", role, checked as boolean)}
                      />
                      <Label htmlFor={`role-${role}`} className="font-normal">
                        {role}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hiringUrgency">Hiring Urgency</Label>
                <Select
                  value={formData.hiringUrgency}
                  onValueChange={(value) => updateFormData("hiringUrgency", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hiring urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (within 2 weeks)</SelectItem>
                    <SelectItem value="soon">Soon (within 1 month)</SelectItem>
                    <SelectItem value="upcoming">Upcoming (1-3 months)</SelectItem>
                    <SelectItem value="planning">Planning (3+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hiringVolume">Hiring Volume</Label>
                <Select value={formData.hiringVolume} onValueChange={(value) => updateFormData("hiringVolume", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select hiring volume" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Single position</SelectItem>
                    <SelectItem value="2-5">2-5 positions</SelectItem>
                    <SelectItem value="6-10">6-10 positions</SelectItem>
                    <SelectItem value="10+">10+ positions</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Candidate Preferences</h2>
              <div className="space-y-2">
                <Label>Required Skills</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    "Prospecting",
                    "Negotiation",
                    "Closing",
                    "Account Management",
                    "CRM Software",
                    "Cold Calling",
                    "Presentations",
                    "Relationship Building",
                  ].map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Checkbox
                        id={`skill-${skill}`}
                        checked={formData.requiredSkills.includes(skill)}
                        onCheckedChange={(checked) => handleCheckboxChange("requiredSkills", skill, checked as boolean)}
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
              <div className="space-y-2">
                <Label htmlFor="remotePreference">Remote Work Preference</Label>
                <Select
                  value={formData.remotePreference}
                  onValueChange={(value) => updateFormData("remotePreference", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select remote preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remote">Fully Remote</SelectItem>
                    <SelectItem value="hybrid">Hybrid</SelectItem>
                    <SelectItem value="onsite">On-site</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                <Textarea
                  id="additionalRequirements"
                  placeholder="Any other specific requirements or qualifications..."
                  rows={3}
                  value={formData.additionalRequirements}
                  onChange={(e) => updateFormData("additionalRequirements", e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button onClick={handleNext}>Next</Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <LoadingSpinner /> : "Complete Setup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
