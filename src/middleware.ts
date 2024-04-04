import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const matchers = ["/organization", "search", "stories", "settings"]
export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    if (matchers.includes(path)) {

        console.log(request.nextUrl.pathname);
        const token = await getToken({ req: request });

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