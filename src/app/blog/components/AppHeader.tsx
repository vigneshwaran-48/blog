"use client";

import React from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AppFields } from '@/util/AppFields';
import { UserMeta } from '@/util/AppTypes';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MoreOptions, { List } from './blog/MoreOptions';
import Image from 'next/image';
import PublishBlog from './PublishBlog';
import NotificationIcon from './notification/NotificationIcon';

export const AppHeader = () => {

    const user: UserMeta = useAppSelector(state => state.userSlice);

    const pathname = usePathname();
    const router = useRouter();

    const handleNavbarToggle = () => {
        const rootElement = document.querySelector(":root");
        if(rootElement) {
            const currentValue = getComputedStyle(rootElement).getPropertyValue(AppFields.APP_NAVBAR_STATUS);
            document.documentElement.style.setProperty(AppFields.APP_NAVBAR_STATUS, currentValue === "-100%" ? "0%" : "-100%");
        }
    }

    const lists: List[] = [
        {
            content: "Profile",
            onClick: () => router.push(`/blog/${user.profileId}`)
        },
        {
            content: "Settings",
            onClick: () => router.push(`/blog/settings/profile`)
        }
    ]

    return (
        <header className={`${styles.appHeader} full-width x-axis-flex`}>
            <div className={`${styles.appOrHamburgerMenu}`}>
                <h1>Blog App</h1>
                <FontAwesomeIcon onClick={handleNavbarToggle} icon={faBars} />
            </div>
            <div className={`${styles.rightBar} x-axis-flex`}>
                {
                    !pathname.startsWith("/blog/compose")
                    ? (
                        <Link 
                            href="/blog/compose" 
                            className={`${styles.composeIcon} x-axis-flex`}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <p>Create</p>
                        </Link>
                    )
                    : (
                        <PublishBlog />
                    )
                }
                <NotificationIcon />
                <MoreOptions 
                    lists={lists} 
                    icon={
                        <Image 
                            className={`${styles.headerImage}`}
                            src={user?.image || "/person.jpg"} 
                            alt="user" 
                            width={40}
                            height={40}
                        />
                    }
                    top="50px"
                    translateX="-80%"
                />
            </div>
        </header>
    )
}
