import { UserMeta } from '@/util/AppTypes';
import React from 'react';
import styles from "./page.module.css";

interface Props {
    members: UserMeta[],
    onAdd: (usersToAdd: UserMeta[]) => void
}

const OrganizationMemberAddPage = ({ members, onAdd }: Props) => {

    return (
        <div className={`${styles.userAddingWindow}`}>
            
        </div>
    )
}

export default OrganizationMemberAddPage;