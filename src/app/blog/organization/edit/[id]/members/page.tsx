import { getUsersOfOrganization } from '@/app/actions/organization';
import { getAllUsers } from '@/app/actions/user';
import React from 'react';
import MembersEditPage from './MembersEditPage';
import { OrganizationUserDTO, UserMeta } from '@/util/AppTypes';
import Goback from '../components/Goback';

interface Props {
    params: {id: number}
}

const OrganizationMemersPage = async ({ params }: Props) => {

    const users: UserMeta[] = await getAllUsers();
    const organizationUsers: OrganizationUserDTO  = await getUsersOfOrganization(params.id);
    
    const orgUsers = organizationUsers.users;

    const filteredUsers = users.filter(user => orgUsers.findIndex(orgUser => orgUser.details.id === user.id) < 0);

    return (
        <div>
            <Goback 
                goBackLink="/blog/organization/edit" 
                text="Members"
            />
            <MembersEditPage users={filteredUsers} orgUsers={organizationUsers.users} />
        </div>
    )
}

export default OrganizationMemersPage;