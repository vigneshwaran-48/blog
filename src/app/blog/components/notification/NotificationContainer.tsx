import React, { useEffect, useState } from 'react';

import styles from "./notification.module.css";
import { Notification } from '@/util/AppTypes';
import { getNotificationsOfUser } from '@/app/actions/notification';
import NotificationComp from './NotificationComp';

const NotificationContainer = () => {

    const [ notifications, setNotifications ] = useState<Notification[]>([]);

    useEffect(() => {
        console.log("Setting notification")
        fetchAndSetNotifications();
    }, []);

    const fetchAndSetNotifications = async () => {
        const notifs: Notification[] = await getNotificationsOfUser();
        console.log(notifs);
        setNotifications(notifs);
    }

    const notificationElems = notifications.map((notification, key) => 
                                                    <NotificationComp key={key} notification={notification} />)

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