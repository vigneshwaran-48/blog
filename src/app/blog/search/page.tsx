import { Metadata } from 'next'
import React from 'react'
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: "Search",
    description: "Search page of blog app"
}

export default async function SearchPage() {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin");
    }

    return (
        <div>Search Page</div>
    )
}
