import { authOptions } from '@/util/authOptions';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const OrganizationList = async () => {

    // Making it as any so I can take the access_token from it without typescript compling it.
    const session: any = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin");
    }

    const response = await fetch("http://localhost:8082/api/v1/app/organization", {
                                headers: {
                                    "Authorization": `Bearer ${session?.access_token}`
                                }
                            });
        
    const data = await response.json();

    console.log(data);
    
    return (
        <div>List</div>
    )
}

export default OrganizationList;
