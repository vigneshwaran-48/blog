import { getOrganization } from '@/app/actions/organization';
import { Organization } from '@/util/AppTypes';
import { Metadata } from 'next';
import React from 'react';
import Navbar from './components/Navbar';
import styles from "./page.module.css";

interface Props {
    params: { id: number },
    children: React.ReactNode
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

    const organization: Organization = await getOrganization(params.id);

    return {
        title: `Edit ${organization.name}`,
        description: `${organization.name} editing page`
    }
}

const OrganizationEditLayout = async ({ children, params }: Props) => {

    return (
        <div className={`${styles.layout} full-body y-axis-flex`}>
            <Navbar id={params.id} />
            <div className={`${styles.main} hide-scrollbar`}>
                { children }
            </div>
        </div>
    )
    
}

export default OrganizationEditLayout;