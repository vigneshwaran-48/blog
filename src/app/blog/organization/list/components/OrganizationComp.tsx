"use client";

import React from 'react'
import { SearchBar } from '../../../components/blog/SearchBar';
import styles from "./page.module.css";
import { Organization } from '@/util/AppTypes';
import Image from 'next/image';
import { NavLink } from '@/util/NavLink';

interface Props {
    organization?: Organization
}

export const OrganizationComp = (props: Props) => {

    const { organization } = props;

    return (
        <NavLink href={`/blog/organization/list/${organization?.id}`} className={`${styles.organizationComp} x-axis-flex`}>
            <Image 
                src={organization?.image || "/person.jpg"}
                width={50}
                height={50}
                alt="organization"
            />
            <div className={`${styles.organizationCompNameDesc}`}>
                <h3>{ organization?.name }</h3>
                <p>{ organization?.description }</p>
            </div>
            <button className={`button`}>View</button>
        </NavLink>
    )
}
