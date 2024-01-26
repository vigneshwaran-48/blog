import React from 'react';
import styles from "./page.module.css";
import OrganizationCreationForm from './components/OrganizationCreationForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Create Organization",
    description: "Organization creating page"
}

const OrganizationCreatePage = () => {
    return (
        <div className={`${styles.organizationCreatePage} hide-scrollbar y-axis-flex`}>
            <h2>Set up your Organization</h2>
            <OrganizationCreationForm />
        </div>
    )
}

export default OrganizationCreatePage;