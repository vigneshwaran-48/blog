import { NavLink } from '@/util/NavLink';
import React from 'react';
import styles from "./navbar.module.css";

const Navbar = () => {
    return (
        <ul className={`${styles.navBar} y-axis-flex`}>
            <li>
                <NavLink href="/blog/settings/profile" className={styles.navLink} activeClassName={styles.activeNavLink}>
                    <p>Profile</p>
                </NavLink>
            </li>
            <li>
                <NavLink href="/blog/settings/customization" className={styles.navLink} activeClassName={styles.activeNavLink}>
                    <p>Customization</p>
                </NavLink>
            </li>
        </ul>
    )
}

export default Navbar;