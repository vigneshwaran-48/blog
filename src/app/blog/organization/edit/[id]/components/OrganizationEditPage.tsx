import { Organization } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";

interface Props {
    organization: Organization
}

const OrganizationEditPage = (props: Props) => {

    const { organization } = props;

    return (
        <div className={`${styles.editLayout} full-body`}>

        </div>
    )
}

export default OrganizationEditPage;