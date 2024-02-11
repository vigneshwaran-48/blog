import React from 'react';
import styles from "./page.module.css";
import { NavLink } from '@/util/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHouse, faMagnifyingGlass, faSitemap, faUserGroup } from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {
    
    return (
        <nav className={`${styles.appNavbar} y-axis-flex`}>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/blog/home"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faHouse} />
                    <p>Home</p>
                </div>
            </NavLink>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/blog/search"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <p>Search</p>
                </div>
            </NavLink>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/blog/organization"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faSitemap} />
                    <p>Organization</p>
                </div>
            </NavLink>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/blog/stories"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faComment} />
                    <p>My Stories</p>
                </div>
            </NavLink>
        </nav>
    )
}
