"use client";

import React from 'react'
import { SearchBar } from '../../components/blog/SearchBar';
import styles from "./page.module.css";
import { Organization } from '@/util/AppTypes';
import Image from 'next/image';
import { NavLink } from '@/util/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Props {
    organization?: Organization,
    href?: string,
    settingsHref: string
}

export const OrganizationComp = (props: Props) => {

    const { organization, href = "/blog/organization", settingsHref = "/blog/organization" } = props;

    return (
        <NavLink href={href} className={`${styles.organizationComp} x-axis-flex`}>
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
            <Link href={`${settingsHref}/settings`}>
                <FontAwesomeIcon icon={faGear} />
            </Link>
        </NavLink>
    )
}
