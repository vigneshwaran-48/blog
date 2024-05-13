import React, { useEffect, useState } from 'react';

import styles from "./notification.module.css";
import { Notification } from '@/util/AppTypes';
import { getNotificationsOfUser, markNotificationAsSeen } from '@/app/actions/notification';
import NotificationComp from './NotificationComp';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { addPopup } from '@/lib/features/popup/popupSlice';
import { getUniqueId } from '@/util/getUniqueId';
import { PopupType } from '../popup/PopUp';

const NotificationContainer = () => {

    const [ notifications, setNotifications ] = useState<Notification[]>([]);

    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(state => state.userSlice.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            fetchAndSetNotifications();
        }
    }, []);

    const fetchAndSetNotifications = async () => {
        const notifs: Notification[] = await getNotificationsOfUser();
        setNotifications(notifs);
    }

    const handleMarkAsSeen = async (id: string) => {
        const response = await markNotificationAsSeen(id);
        if(response.status !== 200) {
            dispatch(addPopup({ id: getUniqueId(), type: PopupType.FAILED, message: response.error }));
            return;
        }
        setNotifications(prevNotifications => {
            return prevNotifications.map(notification => {
                if(notification.id === id) {
                    notification.seen = true;
                }
                return notification;
            });
        });
    }

    const notificationElems = notifications && notifications.map((notification, key) => 
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
                    <p>Mark as read</p>
                </div>
                <div className={`${styles.notifications} full-width hide-scrollbar y-axis-flex`}>
                    { notificationElems }
                </div>
            </div>
        </div>
    )
}

export default NotificationContainer;