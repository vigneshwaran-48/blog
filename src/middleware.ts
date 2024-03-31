import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    if (!request.nextUrl.pathname.startsWith("/welcome") && !request.nextUrl.pathname.startsWith("/auth")) {

        const token = await getToken({ req: request });

        console.log(token);

        if ((!token) && request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/welcome", process.env.NEXTAUTH_URL));
        }
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin?callbackUrl=" + request.url, process.env.NEXTAUTH_URL));
        }
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}