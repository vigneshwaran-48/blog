"use client";

import { SearchBar } from '@/app/blog/components/blog/SearchBar';
import { OrganizationUser, UserMeta } from '@/util/AppTypes';
import React, { useState } from 'react';
import styles from "./page.module.css";
import OrganizationUserContainer from './OrganizationUserContainer';
import Link from 'next/link';
import OrganizationMemberAddPage from './OrganizationMemberAddPage';

interface Props {
    users: UserMeta[],
    orgUsers: OrganizationUser[],
    organizationId: number
}

const MembersEditPage = ({ users, orgUsers, organizationId}: Props) => {

    const [ allUsers, setAllUsers ] = useState<UserMeta[]>(users);
    const [ organizationUsers, setOrganizationUsers ] = useState<OrganizationUser[]>(orgUsers);

    const [ openUserAddComp, setOpenUserAddComp ] = useState<boolean>(false);
    
    const handleUsersSearch = (query: String) => {

    }

    const handleUsersAdd = (users: UserMeta[]) => {

    }

    const handleOpenAddSection = () => {
        setOpenUserAddComp(true);
    }

    const orgUsersElem = organizationUsers.length > 0 ? organizationUsers.map((user, key) => {
        return <OrganizationUserContainer key={key} organizationId={organizationId} user={user} />
    }) : <h1>No users</h1>

    return (
        <div className={`${styles.membersEditPage} full-width y-axis-flex`}>
            <div className={`${styles.orgMembersListContainer} full-body`}>
                <div className={`${styles.searchWrapper} x-axis-flex full-width`}>
                    <SearchBar onSearch={handleUsersSearch} />
                    <button className={`button`} onClick={e => setOpenUserAddComp(true)}>Add</button>
                </div>
                <div className={`full-width y-axis-flex`}>
                    { orgUsersElem }
                </div>
            </div>
            {
                openUserAddComp ? <OrganizationMemberAddPage 
                                        members={users} 
                                        onAdd={handleUsersAdd} 
                                        onClose={() => setOpenUserAddComp(false)}
                                    /> 
                                : ""
            }
        </div>
    );
}

export default MembersEditPage;