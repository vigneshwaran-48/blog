"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AppFields } from '@/util/AppFields';
import { redirect } from 'next/navigation';
import { getSession, useSession } from 'next-auth/react';
import { authOptions } from '@/util/authOptions';
import { Session } from 'next-auth';

export const AppHeader = () => {

    const [ session, setSession ] = useState<Session>();

    useEffect(() => {
        getAndSetSession();
    }, []);

    const getAndSetSession = async () => {
        setSession(await getSession() as Session);
    }


    const handleNavbarToggle = () => {
        const rootElement = document.querySelector(":root");
        if(rootElement) {
            const currentValue = getComputedStyle(rootElement).getPropertyValue(AppFields.APP_NAVBAR_STATUS);
            document.documentElement.style.setProperty(AppFields.APP_NAVBAR_STATUS, currentValue === "-100%" ? "0%" : "-100%");
        }
    }

    // if(!session || new Date(session.expires) > new Date()) {
    //     redirect("/api/auth/signin");
    // }

    // console.log(session)

    return (
        <header className={`${styles.appHeader} full-width x-axis-flex`}>
            <div className={`${styles.appOrHamburgerMenu}`}>
                <h1>Blog App</h1>
                <FontAwesomeIcon onClick={handleNavbarToggle} icon={faBars} />
            </div>
            <img src={session?.user?.image || "/person.jpg"} alt="user" />
        </header>
    )
}
