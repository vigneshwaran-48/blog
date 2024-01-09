import { NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    if(request.nextUrl.pathname.startsWith("/blog")) {

        const token = getToken({req: request});

        if(!token) {
            redirect("/api/auth/signin?callbackUrl=" + request.url);
        }
    }
}
