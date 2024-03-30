import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import styles from "./notification.module.css";
import NotificationContainer from './NotificationContainer';

const NotificationIcon = () => {
    return (
        <div tabIndex={0} className={`${styles.notificationIconContainer}`}>
            <FontAwesomeIcon icon={faBell} />
            <NotificationContainer />
        </div>
    )
}

export default NotificationIcon;