"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { LoadingSpinner } from "@/components/loading-spinner"

export default function SignupPage() {
  const searchParams = useSearchParams()
  const defaultRole = searchParams.get("role") as "sales_rep" | "business_owner" | null

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"sales_rep" | "business_owner">(defaultRole || "sales_rep")
  const [error, setError] = useState("")

  const { signup, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!name || !email || !password) {
      setError("All fields are required")
      return
    }

    try {
      await signup(email, password, name, role)
    } catch (err) {
      setError("Failed to create account. Please try again.")
    }
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to get started</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup
                value={role}
                onValueChange={(value) => setRole(value as "sales_rep" | "business_owner")}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sales_rep" id="sales_rep" />
                  <Label htmlFor="sales_rep" className="font-normal">
                    Sales Representative
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="business_owner" id="business_owner" />
                  <Label htmlFor="business_owner" className="font-normal">
                    Business Owner
                  </Label>
                </div>
              </RadioGroup>
            </div>
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : "Create Account"}
            </Button>
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline underline-offset-4 hover:text-primary/90">
                Log in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
