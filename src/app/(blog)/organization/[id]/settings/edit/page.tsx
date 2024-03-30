import { getOrganization } from '@/app/actions/organization';
import React from 'react';
import GeneralEditForm from './GeneralEditPage';
import { Organization } from '@/util/AppTypes';
import { Metadata } from 'next';

interface Props {
    params: { id: string }
}

export async function generateMetadata({ params: { id }}: Props): Promise<Metadata> {
    const organization: Organization = await getOrganization(id);
    return {
        title: `Edit ${organization.name}`,
        description: `${organization.name}'s editing page`
    }
}

const OrganizationGeneralPage = async ({ params }: Props) => {

    const { id } = params;

    const organization: Organization = await getOrganization(id);

    return (
        <GeneralEditForm organization={organization} />
    )
}

export default OrganizationGeneralPage;