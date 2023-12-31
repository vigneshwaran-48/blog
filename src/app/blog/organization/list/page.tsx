import { authOptions } from '@/util/authOptions';
import { Session, getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { OrganizationComp } from './components/OrganizationComp';
import { getAllOrganizations } from '@/app/actions/organization';

const OrganizationList = async () => {

    // Making it as any so I can take the access_token from it without typescript compling it.
    // const session: any = await getServerSession(authOptions);

    // if(!session) {
    //     redirect("/api/auth/signin");
    // }

    // const response = await fetch("http://localhost:8082/api/v1/app/organization", {
    //                             headers: {
    //                                 "Authorization": `Bearer ${session?.access_token}`
    //                             }
    //                         });
        
    // const data = await response.json();
    const data = await getAllOrganizations();

    console.log(data);
    
    return (
        <OrganizationComp organizations={data} />
    )
}

export default OrganizationList;
