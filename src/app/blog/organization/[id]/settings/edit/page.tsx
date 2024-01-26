import { getOrganization } from '@/app/actions/organization';
import React from 'react';
import GeneralEditForm from './GeneralEditPage';
import { Organization } from '@/util/AppTypes';

interface Props {
    params: { id: number }
}

const OrganizationGeneralPage = async ({ params }: Props) => {

    const { id } = params;

    const organization: Organization = await getOrganization(id);

    return (
        <GeneralEditForm organization={organization} />
    )
}

export default OrganizationGeneralPage;