import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    const token = await getToken({ req: request });

    return await fetch("http://localhost:8082/api/v1/app/user", {
        headers: {
            "Authorization": `Bearer ${Object.create(token).access_token}`
        }
    });
}