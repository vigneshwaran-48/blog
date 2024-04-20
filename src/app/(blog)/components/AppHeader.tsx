"use client";

import React, { useEffect } from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { AppFields } from '@/util/AppFields';
import { UserMeta } from '@/util/AppTypes';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import MoreOptions, { List } from './blog/MoreOptions';
import Image from 'next/image';
import PublishBlog from './PublishBlog';
import NotificationIcon from './notification/NotificationIcon';
import { SearchBar } from './blog/SearchBar';
import { setQuery } from '@/lib/features/search/searchSlice';
import { NavLink } from '@/util/NavLink';
import Link from 'next/link';

export const AppHeader = () => {

    const user: UserMeta = useAppSelector(state => state.userSlice);

    const pathname = usePathname();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const query = useAppSelector(state => state.searchSlice.query);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        dispatch(setQuery(params.get("query") || ""));
    }, [searchParams]);

    const onSearch = (query: string) => {
        dispatch(setQuery(query));
        const params = new URLSearchParams(searchParams);
        params.set("query", query);
        router.push(`${pathname}?${params.toString()}`);
    }

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
            onClick: () => router.push(`/${user.profileId}`)
        },
        {
            content: "Dashboard",
            onClick: () => router.push(`/dashboard`)
        },
        {
            content: "Settings",
            onClick: () => router.push(`/settings/profile`)
        },
        {
            content: "Search",
            onClick: () => router.push(`/search`)
        },
        {
            content: "Organization",
            onClick: () => router.push(`/organization`)
        },
        {
            content: "Stories",
            onClick: () => router.push(`/stories`)
        }
    ]

    return (
        <header className={`${styles.appHeader} full-width x-axis-flex`}>
            <div className={`${styles.appOrHamburgerMenu} flex items-center`}>
                <Link href="/feeds">
                    <h1 className={`text-3xl flex-shrink-0 font-bold`}>Blog App</h1>
                </Link>
                <FontAwesomeIcon onClick={handleNavbarToggle} icon={faBars} />
                <span className="ml-2 hidden text-xs m-4 sm:block">
                    <SearchBar shouldExpandOnActive={true} onSearch={onSearch} value={query} />
                </span>
            </div>
            <div className={`${styles.rightBar} x-axis-flex`}>
                {
                    !pathname.startsWith("/compose")
                    ? (
                        <NavLink 
                            href="/compose" 
                            className={`${styles.composeIcon} x-axis-flex`}
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                            <p>Create</p>
                        </NavLink>
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
                    translateX="-90%"
                />
            </div>
        </header>
    )
}
