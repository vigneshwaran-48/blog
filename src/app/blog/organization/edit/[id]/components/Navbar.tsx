import { NavLink } from '@/util/NavLink';
import React from 'react';
import styles from "./page.module.css";

interface Props {
    id: number
}

const Navbar = ({ id }: Props) => {

    return (
        <nav className={`${styles.navBar} x-axis-flex`}>
            <NavLink 
                href={`/blog/organization/edit/${id}/general`} 
                className={`${styles.navLink}`}
                activeClassName={`${styles.activeNavLink}`}
            >
                <p>General</p>
            </NavLink>
            <NavLink 
                href={`/blog/organization/edit/${id}/members`} 
                className={`${styles.navLink}`}
                activeClassName={`${styles.activeNavLink}`}
            >
                <p>Members</p>
            </NavLink>
            <NavLink 
                href={`/blog/organization/edit/${id}/appearance`} 
                className={`${styles.navLink}`}
                activeClassName={`${styles.activeNavLink}`}
            >
                <p>Appearance</p>
            </NavLink>
        </nav>
    )
}

export default Navbar;