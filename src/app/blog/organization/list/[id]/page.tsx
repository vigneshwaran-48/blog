import { getOrganization } from '@/app/actions/organization';
import { Organization } from '@/util/AppTypes';
import React from 'react';

const OrganizationView = async ({params}: {params: {id: number}}) => {

    const { id } = params;

    const organization: Organization = await getOrganization(id);

    return (
        <div>OrganizationView</div>
    )
}

export default OrganizationView;