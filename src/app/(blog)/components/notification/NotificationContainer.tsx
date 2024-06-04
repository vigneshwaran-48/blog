"use client";

import React from 'react';

import styles from "./notification.module.css";
import { markAllAsSeen, markNotificationAsSeen } from '@/app/actions/notification';
import NotificationComp from './NotificationComp';
import { useAppDispatch } from '@/lib/hooks';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../popup/PopUp';
import { setNotifications } from '@/lib/features/notification/notificationSlice';
import { Notification } from '@/util/AppTypes';

const NotificationContainer = ({ notifications }: { notifications: Notification[] }) => {

    const dispatch = useAppDispatch();

    const handleMarkAsSeen = async (id: string) => {
        const response = await markNotificationAsSeen(id);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(setNotifications(notifications.map(notification => 
            notification.id === id ? { ...notification, seen: true } : notification)
        ));
    }

    const handleMarkAllAsSeen = async () => {
        const response = await markAllAsSeen();
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        dispatch(setNotifications(notifications.map(notification => ({ ...notification, seen: true }))));
    }
    
    const notificationElems = notifications && [...notifications]
                                                .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
                                                .map((notification, key) => 
                                                    <NotificationComp 
                                                        key={key} 
                                                        notification={notification} 
                                                        onMarkAsSeen={handleMarkAsSeen}
                                                    />)

    return (
        <div className={`${styles.containerWrapper}`}>
            <div className={`${styles.notificationContainer} full-body`}>
                <div className={`${styles.notificationContainerHeader} x-axis-flex`}>
                    <h2>Notification</h2>
                    <p onClick={handleMarkAllAsSeen}>Mark all as seen</p>
                </div>
                <div className={`${styles.notifications} full-width hide-scrollbar y-axis-flex`}>
                    { notificationElems }
                </div>
            </div>
        </div>
    )
}

export default NotificationContainer;