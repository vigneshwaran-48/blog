import { Metadata } from 'next';
import React from 'react';

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Customization",
        description: `Customization page`
    }
}

const CustomizationPage = () => {
    return (
        <div>CustomizationPage</div>
    )
}

export default CustomizationPage;