import React from 'react';
import BlogComposeComp from './BlogComposeComp';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Compose",
        description: `Blog composing page`
    }
}

const page = () => {
    return (
        <BlogComposeComp />
    )
}

export default page;