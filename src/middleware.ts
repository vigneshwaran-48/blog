import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    if(request.nextUrl.pathname.startsWith("/blog")) {

        const token = await getToken({req: request});

        if(!token) {
            NextResponse.redirect(new URL("/api/auth/signin?callbackUrl=" + request.url, request.url));
            
        }
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