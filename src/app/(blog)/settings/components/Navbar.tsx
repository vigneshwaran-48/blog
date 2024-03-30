import { NavLink } from '@/util/NavLink';
import React from 'react';
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <ul className={`${styles.navBar} hide-scrollbar y-axis-flex`}>
            <li>
                <NavLink href="/settings/profile" className={styles.navLink} activeClassName={styles.activeNavLink}>
                    <p>Profile</p>
                </NavLink>
            </li>
            <li>
                <NavLink href="/settings/customization" className={styles.navLink} activeClassName={styles.activeNavLink}>
                    <p>Customization</p>
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar;