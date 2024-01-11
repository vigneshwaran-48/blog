import React from 'react'
import { Organization } from '@/util/AppTypes';
import { getAllOrganizations } from '@/app/actions/organization';
import OrganizationContainer from '../components/OrganizationContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Listing Organizations",
    description: "Organization listing page"
}

const OrganizationList = async () => {

    const organizations: Organization[] = await getAllOrganizations();
    
    return (
        <OrganizationContainer hrefBase="/blog/organization/list" organizations={organizations} />
    )
}

export default OrganizationList;
