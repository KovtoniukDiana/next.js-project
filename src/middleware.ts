import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function middleware(request: NextRequest) {

    const { pathname } = request.nextUrl;
    const token = await getToken({ 
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const protectedRoutes = ["/ingredients", "/recipes/new", "/recipes/:path*"];

    if( protectedRoutes.some((route) => pathname.startsWith(route.replace(":path*", ""))) ) {
       
        if(!token) {
        
            const url = new URL("/error", request.url);
            url.searchParams.set("message", "Недостатньо прав");
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/ingredients", "/recipes/new", "/recipes/:path*"]
}