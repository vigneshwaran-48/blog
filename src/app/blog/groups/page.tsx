import { authOptions } from '@/util/authOptions';
import { Metadata } from 'next'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata: Metadata = {
    title: "Groups",
    description: "Groups page of blog app"
}

export default async function GroupsPage() {

  const session = await getServerSession(authOptions);

  if(!session) {
      redirect("/api/auth/signin");
  }

  return (
    <div>Groups Page</div>
  )
}
