import { NextResponse } from "next/server";

export function middleware(req) {

    const token = req.cookies.get("token")?.value; // ✅ Read token

    if (req.nextUrl.pathname === '/auth/signup' || req.nextUrl.pathname === '/auth/signin') {
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }
    // 🔥 Redirect to /auth/signup if no token
    const protectedRoutes = ["/dashboard", "/profile", "/settings"]; // ✅ Add your protected pages here
    const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route));

    if (!token && isProtectedRoute) {
        return NextResponse.redirect(new URL("/auth/signin", req.url));
    }

    return NextResponse.next(); // ✅ Allow access if token exists// Allow access if token exists
}

// Apply middleware only to protected routes
export const config = {
    matcher: ["/:path*"], // Protect these pages
};
