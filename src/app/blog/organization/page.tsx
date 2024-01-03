import { authOptions } from '@/util/authOptions';
import { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import styles from "./page.module.css";
import { SearchBar } from '../components/blog/SearchBar';
import { OrganizationComp } from './components/OrganizationComp';

export const metadata: Metadata = {
    title: "Organization",
    description: "Organization page of blog app"
}

export default async function OrganizationPage() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin");
    }

    // This wont get the access token in the route.ts because the access token is got from the cookied
    // But this is an request inside server. So there will no cookie.
    // const organizations = await fetch("http://localhost:3000/api/organization");

    const response = await fetch("http://localhost:8082/api/v1/app/organization", {
                                headers: {
                                    "Authorization": `Bearer ${Object.create(session)?.access_token}`
                                }
                            });

    const data = await response.json();

    return (
        <section className={`${styles.organizationSection} full-body y-axis-flex`}>
            <h1>Orgnization</h1>

            <OrganizationComp organizations={data.organization} />
        </section>
    )
}
