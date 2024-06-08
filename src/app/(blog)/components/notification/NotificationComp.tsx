import { Notification } from '@/util/AppTypes';
import React from 'react';
import styles from "./notification.module.css";
import Image from 'next/image';

interface Props {
    notification: Notification, 
    onMarkAsSeen: (id: string) => void
}

const NotificationComp = ({ notification, onMarkAsSeen }: Props) => {

    const handleMarkAsSeen = () => {
        if(!notification.seen) {
            onMarkAsSeen(notification.id);
        }
    }

    let displayTime;
    if (new Date(notification.time).toLocaleDateString() === new Date().toLocaleDateString()) {
        displayTime = new Date(notification.time).toLocaleTimeString().slice(0, 5);
    } else {
        displayTime = new Date(notification.time).toLocaleDateString().slice(0, 5);
    }
    
    return (
        <div 
            onClick={handleMarkAsSeen} 
            className={`${styles.notification} ${!notification.seen ? styles.hoverable : ""} full-width x-axis-flex`}
        >
            <Image 
                src={notification.senderImage || "/person.jpg"}
                alt="Notification Sender"
                width={45}
                height={45}
            />
            <div className={`${styles.middle} y-axis-flex`}>
                <b><p>{ notification.senderName }</p></b>
                <p>{ notification.message }</p>
            </div>
            <div className={`${styles.timeAndSeenStatus} y-axis-flex`}>
                <p>{ displayTime }</p>
                {
                    <div className={`${styles.unseenIndicator} ${!notification.seen && styles.unSeenColor}`}></div>
                }
            </div>
        </div>
    )
}

export default NotificationComp;