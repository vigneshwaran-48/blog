import { Metadata } from 'next';
import React from 'react';
import CustomizationPage from './CustomizationPage';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Customization",
        description: `Customization page`
    }
}

const page = () => {

    return (
        <CustomizationPage />
    )
}

export default page;