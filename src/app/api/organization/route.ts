import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {

    const token = await getToken({ req: request });

    const body = await request.json();

    console.log(body);

    return await fetch("http://localhost:8082/api/v1/app/organization", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token?.access_token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
}