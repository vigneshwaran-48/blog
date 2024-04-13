import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const matchers = ["/organization", "/search", "/stories", "/settings"]
export async function middleware(request: NextRequest) {

    const path = request.nextUrl.pathname;
    console.log(path)
    const matched = matchers.findIndex(matcher => path.startsWith(matcher))
    console.log(matched)
    if (matched > -1) {

        const token = await getToken({ req: request });

        if ((!token) && request.nextUrl.pathname === "/") {
            return NextResponse.redirect(new URL("/welcome", process.env.NEXTAUTH_URL));
        }
        if (!token) {
            return NextResponse.redirect(new URL("/auth/signin?callbackUrl=" + request.url, process.env.NEXTAUTH_URL));
        }

        console.log(token);
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}