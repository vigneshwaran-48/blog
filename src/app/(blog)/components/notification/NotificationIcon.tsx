"use client";

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styles from "./notification.module.css";
import NotificationContainer from './NotificationContainer';
import { useAppSelector } from '@/lib/hooks';

const NotificationIcon = () => {

    const notifications = useAppSelector(state => state.notificationSlice.notifications);

    const showNotificationIndicator = notifications.filter(notification => !notification.seen).length > 0;

    return (
        <div tabIndex={0} className={`${styles.notificationIconContainer}`}>
            <span className="relative cursor-pointer">
                <FontAwesomeIcon icon={faBell} />
                <div className={`p-1 bg-[red] rounded-full absolute top-[-0.75%] right-0 ${showNotificationIndicator ? "block" : "hidden"}`}></div>
            </span>
            <NotificationContainer notifications={notifications} />
        </div>
    )
}

export default NotificationIcon;