import { getOrganization } from '@/app/actions/organization';
import React from 'react';
import GeneralEditForm from './GeneralEditPage';

interface Props {
    params: { id: number }
}

const OrganizationGeneralPage = async ({ params }: Props) => {

    const { id } = params;

    const organization = await getOrganization(id);

    return (
        <div className={`full-body`}>
            <GeneralEditForm organization={organization} />
        </div>
    )
}

export default OrganizationGeneralPage;