import React from 'react'
import { Organization } from '@/util/AppTypes';
import { getAllOrganizations } from '@/app/actions/organization';
import OrganizationContainer from './components/OrganizationContainer';

const OrganizationList = async () => {

    const organizations: Organization[] = await getAllOrganizations();
    
    return (
        <OrganizationContainer organizations={organizations} />
    )
}

export default OrganizationList;
