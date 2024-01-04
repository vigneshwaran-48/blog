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
        <section className={`${styles.organizationSection} full-body y-axis-flex`}>
            <h2>Orgnization</h2>
            {/* <OrganizationComp organizations={data.organization} /> */}
            <div className={`${styles.organizationBody} full-body`}>
                <OrganizationNavbar />
                <div className="full-width">
                    { children }
                </div>
            </div>
        </section>
    )
}

export default OrganizationPageLayout;