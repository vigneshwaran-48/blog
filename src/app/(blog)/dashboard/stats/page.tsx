import { Metadata } from 'next';
import React from 'react'
import BlogViewStatsContainer from './BlogViewStatsContainer';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Stats",
        description: `Stats of the user`
    }
}

const page = async () => {
    
    return (
        <div className="w-full h-full sm:p-2">
            <BlogViewStatsContainer />
        </div>
    )
}

export default page;