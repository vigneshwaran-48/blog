import { Notification } from '@/util/AppTypes';
import React from 'react';
import styles from "./notification.module.css";
import Image from 'next/image';

interface Props {
    notification: Notification, 
    onMarkAsSeen: (id: number) => void
}

const NotificationComp = ({ notification, onMarkAsSeen }: Props) => {

    const handleMarkAsSeen = () => {
        if(!notification.seen) {
            onMarkAsSeen(notification.id);
        }
    }

    console.log(notification);

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
                <p>{ notification.time.slice(0, 3) }</p>
                {
                    <div className={`${styles.unseenIndicator} ${!notification.seen && styles.unSeenColor}`}></div>
                }
            </div>
        </div>
    )
}

export default NotificationComp;