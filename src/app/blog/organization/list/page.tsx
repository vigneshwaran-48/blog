"use client";

import React, { useEffect, useState } from 'react'
import { OrganizationComp } from './components/OrganizationComp';
import { SearchBar } from '../../components/blog/SearchBar';
import styles from "./page.module.css";
import { Organization } from '@/util/AppTypes';
import { getAllOrganizations } from '@/app/actions/organization';

const OrganizationList = () => {

    const [ organizations, setOrganizations ] = useState<Organization[]>([]);

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        const orgs = await getAllOrganizations();
        setOrganizations(orgs);
    }

    const organizationElems = organizations.length > 0 
                                        ? organizations
                                            .map((organization, k) => <OrganizationComp key={k}  organization={organization} />)
                                        : <h2>You are not part of any organization</h2>
    
    return (
        <div>
            <div className={`${styles.searchBar} full-width x-axis-flex`}>
                <SearchBar onSearch={() => {}} />
            </div>
            { organizationElems }
        </div>
    )
}

export default OrganizationList;
