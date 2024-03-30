import { NavLink } from '@/util/NavLink'
import React from 'react';
import styles from "./page.module.css";

export const OrganizationNavbar = () => {
    return (
        <nav className={`${styles.organizationNavbar} full-width`}>
            <ul className={`y-axis-flex full-width hide-scrollbar`}>
                <li>
                    <NavLink 
                        href="/organization/create"
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >Create</NavLink></li>
                <li>
                    <NavLink 
                        href="/organization/list"
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >List</NavLink></li>
                <li>
                    <NavLink 
                        href="/organization/edit"
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >Edit</NavLink></li>
            </ul>
        </nav>
    )
}
