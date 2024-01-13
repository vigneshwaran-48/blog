import { getOrganizationsUserHasEditPermission } from '@/app/actions/organization';
import { Metadata } from 'next';
import React from 'react';
import OrganizationContainer from '../components/OrganizationContainer';

export const metadata: Metadata = {
    title: "Edit Organization",
    description: "Organizations editing page"
}

const OrganizationEditPage = async () => {

    const organizations = await getOrganizationsUserHasEditPermission();

    return (
        <OrganizationContainer hrefBase="/blog/organization/edit" organizations={organizations} />
    )
}

export default OrganizationEditPage;