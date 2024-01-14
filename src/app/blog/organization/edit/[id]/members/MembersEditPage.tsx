"use client";

import { OrganizationUser, UserMeta } from '@/util/AppTypes';
import React, { useState } from 'react';
import UserAddingSection from '../../../create/components/UserAddingSection';

interface Props {
    users: UserMeta[],
    orgUsers: OrganizationUser[]
}

const MembersEditPage = (props: Props) => {

    const [ allUsers, setAllUsers ] = useState<UserMeta[]>(props.users);
    const [ organizationUsers, setOrganizationUsers ] = useState<UserMeta[]>(props.orgUsers.map(orgUser => orgUser.details));

    return (
        <UserAddingSection 
            users={allUsers} 
            addedUsers={organizationUsers} 
            setUsers={setAllUsers}
            setAddedUsers={setOrganizationUsers}
        />
    );
}

export default MembersEditPage;