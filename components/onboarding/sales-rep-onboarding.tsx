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
import { LoadingSpinner } from "@/components/loading-spinner"
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'

const steps = [
  { id: "personal", title: "Personal Information" },
  { id: "experience", title: "Sales Experience" },
  { id: "skills", title: "Skills & Expertise" },
  { id: "preferences", title: "Job Preferences" },
]

const countries = [
  { code: "US", name: "United States", phoneCode: "+1" },
  { code: "GB", name: "United Kingdom", phoneCode: "+44" },
  { code: "CA", name: "Canada", phoneCode: "+1" },
  { code: "AU", name: "Australia", phoneCode: "+61" },
  { code: "DE", name: "Germany", phoneCode: "+49" },
  { code: "FR", name: "France", phoneCode: "+33" },
  { code: "IN", name: "India", phoneCode: "+91" },
  { code: "JP", name: "Japan", phoneCode: "+81" },
  // Add more countries as needed
]

export function SalesRepOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, updateUser } = useAuth()
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    // Personal Information
    phoneCountry: "US",
    phoneNumber: "",
    country: "US",
    bio: "",

    // Sales Experience
    yearsOfExperience: "",
    previousCompanies: "",
    achievements: "",

    // Skills & Expertise
    lifetimeCashCollected: "",

    // Job Preferences
    jobTypes: [] as string[],
    salaryExpectation: "",
    remotePreference: "",
    willingToRelocate: false,
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePhoneChange = (value: string) => {
    // Remove any non-digit characters except plus sign
    const cleaned = value.replace(/[^\d+]/g, '')
    updateFormData("phoneNumber", cleaned)
  }

  const isPhoneValid = () => {
    try {
      const fullNumber = formData.phoneNumber.startsWith('+') 
        ? formData.phoneNumber 
        : countries.find(c => c.code === formData.phoneCountry)?.phoneCode + formData.phoneNumber
      return isValidPhoneNumber(fullNumber || '')
    } catch {
      return false
    }
  }

  const handleNext = () => {
    if (currentStep === 0 && !isPhoneValid()) {
      alert("Please enter a valid phone number")
      return
    }
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
              <h2 className="text-xl font-bold">Personal Information</h2>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="flex gap-2">
                  <Select value={formData.phoneCountry} onValueChange={(value) => updateFormData("phoneCountry", value)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                          {country.name} ({country.phoneCode})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={formData.phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.country} onValueChange={(value) => updateFormData("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself and your professional background..."
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => updateFormData("bio", e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Sales Experience</h2>
              <div className="space-y-2">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Select
                  value={formData.yearsOfExperience}
                  onValueChange={(value) => updateFormData("yearsOfExperience", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-1">Less than 1 year</SelectItem>
                    <SelectItem value="1-3">1-3 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="5-10">5-10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="previousCompanies">Previous Companies</Label>
                <Textarea
                  id="previousCompanies"
                  placeholder="List your previous employers..."
                  rows={3}
                  value={formData.previousCompanies}
                  onChange={(e) => updateFormData("previousCompanies", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="achievements">Key Achievements</Label>
                <Textarea
                  id="achievements"
                  placeholder="Describe your notable sales achievements..."
                  rows={3}
                  value={formData.achievements}
                  onChange={(e) => updateFormData("achievements", e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Skills & Expertise</h2>
              <div className="space-y-2">
                <Label htmlFor="lifetimeCashCollected">Lifetime Cash Collected ($)</Label>
                <Input
                  id="lifetimeCashCollected"
                  type="number"
                  min="0"
                  placeholder="Enter amount in USD"
                  value={formData.lifetimeCashCollected}
                  onChange={(e) => updateFormData("lifetimeCashCollected", e.target.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Job Preferences</h2>
              <div className="space-y-2">
                <Label>Job Types</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Temporary"].map((jobType) => (
                    <div key={jobType} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`jobType-${jobType}`}
                        checked={formData.jobTypes.includes(jobType)}
                        onChange={(e) => {
                          const updatedTypes = e.target.checked
                            ? [...formData.jobTypes, jobType]
                            : formData.jobTypes.filter((t) => t !== jobType)
                          updateFormData("jobTypes", updatedTypes)
                        }}
                      />
                      <Label htmlFor={`jobType-${jobType}`} className="font-normal">
                        {jobType}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryExpectation">Salary Expectation</Label>
                <Select
                  value={formData.salaryExpectation}
                  onValueChange={(value) => updateFormData("salaryExpectation", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select salary range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
                    <SelectItem value="50k-70k">$50,000 - $70,000</SelectItem>
                    <SelectItem value="70k-100k">$70,000 - $100,000</SelectItem>
                    <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                    <SelectItem value="150k+">$150,000+</SelectItem>
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
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="willingToRelocate"
                  checked={formData.willingToRelocate}
                  onChange={(e) => updateFormData("willingToRelocate", e.target.checked)}
                />
                <Label htmlFor="willingToRelocate" className="font-normal">
                  I am willing to relocate for the right opportunity
                </Label>
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