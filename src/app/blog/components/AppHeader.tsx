"use client";

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AppFields } from '@/util/AppFields';
import { UserMeta } from '@/util/AppTypes';
import { useAppSelector } from '@/lib/hooks';

export const AppHeader = () => {

    const user: UserMeta = useAppSelector(state => state.userSlice);


    const handleNavbarToggle = () => {
        const rootElement = document.querySelector(":root");
        if(rootElement) {
            const currentValue = getComputedStyle(rootElement).getPropertyValue(AppFields.APP_NAVBAR_STATUS);
            document.documentElement.style.setProperty(AppFields.APP_NAVBAR_STATUS, currentValue === "-100%" ? "0%" : "-100%");
        }
    }

    return (
        <header className={`${styles.appHeader} full-width x-axis-flex`}>
            <div className={`${styles.appOrHamburgerMenu}`}>
                <h1>Blog App</h1>
                <FontAwesomeIcon onClick={handleNavbarToggle} icon={faBars} />
            </div>
            <img src={user?.image || "/person.jpg"} alt="user" />
        </header>
    )
}
