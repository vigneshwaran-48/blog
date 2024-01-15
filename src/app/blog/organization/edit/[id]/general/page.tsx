import { getOrganization } from '@/app/actions/organization';
import React from 'react';
import GeneralEditForm from './GeneralEditPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import styles from "./page.module.css";
import Link from 'next/link';
import { Organization } from '@/util/AppTypes';
import Goback from '../components/Goback';

interface Props {
    params: { id: number }
}

const OrganizationGeneralPage = async ({ params }: Props) => {

    const { id } = params;

    const organization: Organization = await getOrganization(id);

    return (
        <div className={`${styles.page} full-body`}>
            <Goback 
                goBackLink="/blog/organization/edit" 
                text="General"
            />
            <GeneralEditForm organization={organization} />
        </div>
    )
}

export default OrganizationGeneralPage;