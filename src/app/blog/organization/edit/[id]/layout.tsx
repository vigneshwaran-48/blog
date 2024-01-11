import { getOrganization } from '@/app/actions/organization';
import { Organization } from '@/util/AppTypes';
import { Metadata } from 'next';
import React from 'react';

interface Props {
    params: { id: number }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const organization: Organization = await getOrganization(params.id);

    return {
        title: `Edit ${organization.name}`,
        description: `${organization.name} editing page`
    }
}

const OrganizationEditLayout = async ({ children }: { children: React.ReactNode }) => {

    return (
        <div>
            { children }
        </div>
    )
    
}

export default OrganizationEditLayout;