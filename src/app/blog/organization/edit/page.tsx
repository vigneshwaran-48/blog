import { getOrganizationsUserHasEditPermission } from '@/app/actions/organization';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Edit Organization",
    description: "Organizations editing page"
}

const OrganizationEditPage = async () => {

    const organizations = await getOrganizationsUserHasEditPermission();

    console.log(organizations);

    return (
        <div>OrganizationEditPage</div>
    )
}

export default OrganizationEditPage;