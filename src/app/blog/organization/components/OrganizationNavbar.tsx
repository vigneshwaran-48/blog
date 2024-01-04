import { NavLink } from '@/util/NavLink'
import React from 'react';
import styles from "./page.module.css";

export const OrganizationNavbar = () => {
    return (
        <nav className={`${styles.organizationNavbar} full-width`}>
            <ul className={`x-axis-flex full-width`}>
                <li>
                    <NavLink 
                        href="/blog/organization/create"
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >Create</NavLink></li>
                <li>
                    <NavLink 
                        href="/blog/organization/list"
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >List</NavLink></li>
                <li>
                    <NavLink 
                        href="/blog/organization/edit"
                        className={`${styles.navLink}`}
                        activeClassName={`${styles.activeNavLink}`}
                    >Edit</NavLink></li>
            </ul>
        </nav>
    )
}
