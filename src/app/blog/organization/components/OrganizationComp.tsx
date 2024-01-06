"use client";

import React from 'react'
import { SearchBar } from '../../components/blog/SearchBar';
import styles from "./page.module.css";
import { Organization } from '@/util/AppTypes';

interface Props {
    organizations?: Organization[]
}

export const OrganizationComp = (props: Props) => {

    const { organizations = [] } = props;

    const handleOrgChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        console.log(`Searching for Org ${value}`);
    }

    return (
        <div>
            <div className={`${styles.searchBar} full-width x-axis-flex`}>
                <SearchBar callback={handleOrgChange} />
            </div>

            <div className={`${styles.organizationsListContainer}`}>
                {
                    organizations.length > 0 ? (
                        <div>{ organizations[0].name }</div>
                    )
                    : <h2>You are not a part of any organization</h2>
                }
            </div>
        </div>
    )
}
