import React from 'react';
import styles from "./page.module.css";
import OrganizationCreationForm from './components/OrganizationCreationForm';

const OrganizationCreatePage = () => {
    return (
        <div className={`${styles.organizationCreatePage} full-body y-axis-flex`}>
            <h2>Set up your Organization</h2>
            <OrganizationCreationForm />
        </div>
    )
}

export default OrganizationCreatePage;