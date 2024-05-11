import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {

    const token = await getToken({ req });

    const response = await fetch("http://localhost:8082/api/v1/app/user/1",{
                                headers: {
                                    "Authorization": `Bearer ${token?.access_token}`
                                }
                            });
 
    return response;
}
