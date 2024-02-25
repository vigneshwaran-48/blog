"use client";

import { Organization } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./page.module.css";
import { SearchBar } from '../components/blog/SearchBar';
import { OrganizationComp } from './components/OrganizationComp';
import Link from 'next/link';

interface Props {
    organizations: Organization[]
}

const OrganizationListing = ({ organizations }: Props) => {

    const [ orgsToShow, setOrgsToShow ] = useState<Organization[]>(organizations);

    const handleOrganizationSearch = (query: string) => {
        setOrgsToShow(organizations.filter(org => org.name?.toLowerCase().includes(query.toLowerCase())));
    }

    const organizationElems = orgsToShow && orgsToShow.map((organization, key) => {
        return <OrganizationComp 
                    key={key} 
                    organization={organization} 
                    href={`/blog/${organization.profileId}`}
                    settingsHref={`/blog/organization/${organization.id}`} />
    });

    return (
        <div className={`${styles.main} y-axis-flex full-body`}>
            <div className={`${styles.header} x-axis-flex`}>
                <SearchBar onSearch={handleOrganizationSearch} />
                <Link href="/blog/organization/create">
                    <button className={`button`}>Create</button>
                </Link>
            </div>
            <div className={`${styles.organizationListingContainer} hide-scrollbar full-width y-axis-flex`}>
                { organizationElems }
            </div>
        </div>
    )
}

export default OrganizationListing;