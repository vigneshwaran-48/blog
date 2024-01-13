"use client";

import { Organization } from '@/util/AppTypes';
import React, { useState } from 'react';
import { OrganizationComp } from './OrganizationComp';
import styles from "./page.module.css";
import { SearchBar } from '@/app/blog/components/blog/SearchBar';

interface Props {
    organizations: Organization[],
    hrefBase?: string
}

const OrganizationContainer = (props: Props) => {

    const { hrefBase = "/blog/organization" } = props;


    // Need to remove this state if I don't have plan to have delete button in this organization listing page.
    const [ organizations, setOrganizations ] = useState<Organization[]>(props.organizations);

    const [ organizationSearchQuery, setOrganizationSearchQuery ] = useState<string>("");

    const organizationElems = organizations.length > 0 
                                        ? organizations
                                            .filter(organization => 
                                                organizationSearchQuery.length <= 0 
                                                || 
                                                organization.name?.toLowerCase().includes(organizationSearchQuery.toLowerCase()))
                                            .map((organization, k) => <OrganizationComp 
                                                                            key={k}  
                                                                            organization={organization} 
                                                                            href={`${hrefBase}/${organization.id}`}
                                                                        />)
                                        : <h2>You are not part of any organization</h2>

    return (
        <div className={`${styles.organizaitonListingPage}`}>
            <SearchBar onSearch={setOrganizationSearchQuery} />
            <div className={`${styles.organizationContainer} hide-scrollbar y-axis-flex full-width`}>
                { organizationElems }
            </div>
        </div>
    )
}

export default OrganizationContainer