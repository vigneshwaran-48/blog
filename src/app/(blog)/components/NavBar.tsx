import React from 'react';
import styles from "./page.module.css";
import { NavLink } from '@/util/NavLink';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faMagnifyingGlass, faRss, faSitemap } from '@fortawesome/free-solid-svg-icons';

export const NavBar = () => {
    
    return (
        <nav className={`${styles.appNavbar} flex flex-row sm:flex-col`}>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/feeds"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faRss} />
                    <p>Feeds</p>
                </div>
            </NavLink>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/search"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <p>Search</p>
                </div>
            </NavLink>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/organization"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faSitemap} />
                    <p>Organization</p>
                </div>
            </NavLink>
            <NavLink 
                activeClassName={`${styles.activeNavLink}`}
                className={`${styles.navLink}`}
                href="/stories"
            >
                <div className={`${styles.navLinkChild} x-axis-flex`}>
                    <FontAwesomeIcon icon={faComment} />
                    <p>My Stories</p>
                </div>
            </NavLink>
        </nav>
    )
}
