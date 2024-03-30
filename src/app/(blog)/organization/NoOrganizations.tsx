import React from 'react';
import styles from "./noOrganization.module.css";
import Link from 'next/link';

const NoOrganizations = () => {
    return (
        <div className={`${styles.noOrganization} y-axis-flex`}>
            <img 
                src="/create-join-organization.png"
                alt="Create or Join a organization"
            />
            <Link href="/organization/create">
                <button className={`button`}>Create Organization</button>
            </Link>
        </div>
    )
}

export default NoOrganizations;