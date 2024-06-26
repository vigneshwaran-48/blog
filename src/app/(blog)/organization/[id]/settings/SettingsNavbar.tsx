import React from 'react';
import styles from "./navbar.module.css";
import { NavLink } from '@/util/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface Props {
    organizationId: number
}

const SettingsNavbar = ({ organizationId }: Props) => {
    return (
        <nav className={`${styles.organizationNavbar} x-axis-flex full-width`}>
            <NavLink 
                href={`/organization`}
                className={`${styles.navLink}`}
            >
                <FontAwesomeIcon icon={faArrowLeftLong} />
            </NavLink>
            <ul className={`x-axis-flex full-width hide-scrollbar`}>
                <li>
                    <NavLink 
                        href={`/organization/${organizationId}/settings/edit`}
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >Edit</NavLink></li>
                <li>
                    <NavLink 
                        href={`/organization/${organizationId}/settings/members`}
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >Members</NavLink></li>
            </ul>
        </nav>
    )
}

export default SettingsNavbar;