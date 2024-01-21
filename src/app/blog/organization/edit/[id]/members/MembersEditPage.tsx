"use client";

import { SearchBar } from '@/app/blog/components/blog/SearchBar';
import { OrganizationUser, UserMeta } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./page.module.css";
import OrganizationUserContainer from './OrganizationUserContainer';

interface Props {
    users: UserMeta[],
    orgUsers: OrganizationUser[],
    organizationId: number
}

const MembersEditPage = ({ users, orgUsers, organizationId}: Props) => {

    const [ allUsers, setAllUsers ] = useState<UserMeta[]>(users);
    const [ organizationUsers, setOrganizationUsers ] = useState<OrganizationUser[]>(orgUsers);
    
    const handleUsersSearch = (query: String) => {

    }

    const orgUsersElem = organizationUsers.length > 0 ? organizationUsers.map((user, key) => {
        return <OrganizationUserContainer key={key} organizationId={organizationId} user={user} />
    }) : <h1>No users</h1>

    return (
        <div className={`${styles.orgUsersListingContainer} y-axis-flex`}>
            <SearchBar onSearch={handleUsersSearch} />
            <div className={`y-axis-flex`}>
                { orgUsersElem }
            </div>
        </div>
    );
}

export default MembersEditPage;