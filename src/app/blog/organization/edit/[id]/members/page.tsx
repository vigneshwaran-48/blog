import { getUsersOfOrganization } from '@/app/actions/organization';
import { getAllUsers } from '@/app/actions/user';
import React from 'react';
import MembersEditPage from './MembersEditPage';
import { OrganizationUserDTO, UserMeta } from '@/util/AppTypes';
import Goback from '../components/Goback';
import { Metadata } from 'next';
import styles from "./page.module.css";

interface Props {
    params: {id: number}
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {

    const organizationUsers: OrganizationUserDTO = await getUsersOfOrganization(id);

    return {
        title: `Members of ${organizationUsers.organization.name}`,
        description: `Members editing page of ${organizationUsers.organization.name}`
    }
}

const OrganizationMemersPage = async ({ params }: Props) => {

    const users: UserMeta[] = await getAllUsers();
    const organizationUsers: OrganizationUserDTO  = await getUsersOfOrganization(params.id);
    
    const orgUsers = organizationUsers.users;

    const filteredUsers = users.filter(user => orgUsers.findIndex(orgUser => orgUser.details.id === user.id) < 0);

    return (
        <div className={`${styles.layout} full-body`}>
            <Goback 
                goBackLink="/blog/organization/edit" 
                text="Members"
            />
            <MembersEditPage users={filteredUsers} orgUsers={organizationUsers.users} organizationId={params.id} />
        </div>
    )
}

export default OrganizationMemersPage;