import { getOrganization } from '@/app/actions/organization';
import React from 'react';

interface Props {
    params: { id: number }
}

const OrganizationEditGeneralPage = async ({ params }: Props) => {

    const organization = await getOrganization(params.id);

    return (
        <div>OrganizationEditGeneralPage</div>
    )
}

export default OrganizationEditGeneralPage;