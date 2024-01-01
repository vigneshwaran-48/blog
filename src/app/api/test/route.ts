import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextApiRequest) {

    const token = await getToken({ req });

    const response = await fetch("http://localhost:8082/api/v1/app/user/1",{
                                headers: {
                                    "Authorization": `Bearer ${token?.access_token}`
                                }
                            });
 
    return response;
}
