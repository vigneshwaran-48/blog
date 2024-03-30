import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    if(!request.nextUrl.pathname.startsWith("/welcome")) {

        const token = await getToken({req: request});

        if(!token && request.nextUrl.pathname === "/") {
            NextResponse.redirect(new URL("/welcome")); 
        } else {
            NextResponse.redirect(new URL("/api/auth/signin?callbackUrl=" + request.url, request.url));  
        }
        console.log(token);
        const expireDate = new Date(Object.create(token).exp);
        const currentDate = new Date();

        if(expireDate < currentDate) {
            NextResponse.redirect(new URL("/api/auth/signin?callbackUrl=" + request.url, request.url));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}