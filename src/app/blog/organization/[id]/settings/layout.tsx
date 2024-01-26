import { Metadata } from 'next'
import React from 'react'
import styles from "./page.module.css";
import SettingsNavbar from './SettingsNavbar';

export const metadata: Metadata = {
    title: "Organization",
    description: "Organization page of blog app"
}

interface Props {
    params: {id: number},
    children: React.ReactNode
}

const OrganizationPageLayout = ({ children, params: { id } }: Props) => {

    return (
        <section className={`${styles.organizationSection} full-body y-axis-flex`}>
            <SettingsNavbar organizationId={id} />
            <div className={`${styles.organizationBody} full-body hide-scrollbar y-axis-flex`}>
                { children }
            </div>
        </section>
    )
}

export default OrganizationPageLayout;