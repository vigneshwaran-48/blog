import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Stats",
        description: `Stats of the user`
    }
}

const page = () => {
    return (
        <div>Stats</div>
    )
}

export default page;