import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("helios_user")?.value

  // Define protected routes
  const protectedRoutes = ["/dashboard", "/jobs", "/applications", "/profile", "/company", "/search"]
  const authRoutes = ["/login", "/signup"]

  const isProtectedRoute = protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  const isOnboardingRoute = request.nextUrl.pathname.startsWith("/onboarding")

  // Special case for onboarding - allow access if user exists
  if (isOnboardingRoute && currentUser) {
    return NextResponse.next()
  }

  // Redirect to login if accessing protected route without being logged in
  if (isProtectedRoute && !currentUser) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Redirect to dashboard if accessing auth routes while logged in
  if (isAuthRoute && currentUser) {
    // Parse the user to check onboarding status
    try {
      const userData = JSON.parse(currentUser)
      // If onboarding is not completed, redirect to onboarding
      if (userData.onboardingStatus !== "completed") {
        return NextResponse.redirect(new URL("/onboarding", request.url))
      }
      // Otherwise redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url))
    } catch (error) {
      // If parsing fails, just redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/onboarding/:path*", "/jobs/:path*", "/login", "/signup"],
}
