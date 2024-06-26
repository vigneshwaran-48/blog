"use client";

import { Organization } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./page.module.css";
import { SearchBar } from '../components/blog/SearchBar';
import { OrganizationComp } from './components/OrganizationComp';
import { NavLink } from '@/util/NavLink';

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
                    href={`/${organization.profileId}`}
                    settingsHref={`/organization/${organization.id}`} />
    });

    return (
        <div className={`${styles.main} y-axis-flex full-body`}>
            <div className={`${styles.header} x-axis-flex`}>
                <SearchBar onSearch={handleOrganizationSearch} />
                <NavLink href="/organization/create">
                    <button className={`button`}>Create</button>
                </NavLink>
            </div>
            <div className={`${styles.organizationListingContainer} hide-scrollbar full-width y-axis-flex`}>
                { organizationElems }
            </div>
        </div>
    )
}

export default OrganizationListing;