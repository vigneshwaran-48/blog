import { getOrganization } from '@/app/actions/organization';
import React from 'react';
import GeneralEditForm from './GeneralEditPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import styles from "./page.module.css";
import Link from 'next/link';

interface Props {
    params: { id: number }
}

const OrganizationGeneralPage = async ({ params }: Props) => {

    const { id } = params;

    const organization = await getOrganization(id);

    return (
        <div className={`${styles.page} full-body`}>
            <div className={`${styles.header} x-axis-flex`}>
                <Link href="/blog/organization/edit">
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                </Link>
                <h2>General</h2>
            </div>
            <GeneralEditForm organization={organization} />
        </div>
    )
}

export default OrganizationGeneralPage;