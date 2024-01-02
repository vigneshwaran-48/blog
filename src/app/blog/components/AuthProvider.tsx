import { authOptions } from '@/util/authOptions'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

/**
 * Not using this now. Currently If I use it in layout.tsx then the page refreshes for every route navigation.
 */
export const AuthProvider = async ({ children }: { children: React.ReactNode }) => {

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin");
    }

    return (
        <>
            { children }
        </>
    )
}
