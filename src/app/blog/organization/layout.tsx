import { Metadata } from 'next'
import React from 'react'
import styles from "./page.module.css";
import { OrganizationNavbar } from './components/OrganizationNavbar';

export const metadata: Metadata = {
    title: "Organization",
    description: "Organization page of blog app"
}

const OrganizationPageLayout = ({ children }: { children : React.ReactNode }) => {

    return (
        <section className={`${styles.organizationSection} full-body x-axis-flex`}>
            <OrganizationNavbar />
            <div className={`${styles.organizationBody} full-body hide-scrollbar y-axis-flex`}>
                { children }
            </div>
        </section>
    )
}

export default OrganizationPageLayout;