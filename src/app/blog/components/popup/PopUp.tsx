import React, { useEffect } from 'react';
import styles from "./page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faExclamation, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Popup } from '@/lib/features/popup/popupSlice';

const successIcon = (
        <FontAwesomeIcon icon={faCheck} />
)

const failedIcon = (
        <FontAwesomeIcon icon={faExclamation} />
)

export enum PopupType {
    SUCCESS,
    FAILED
}

interface Props {
    popup: Popup,
    onClose: (id: string) => void
}

const PopUp = (props: Props) => {

    const { type, message, duration = 3, id  } = props.popup;

    useEffect(() => {
        setTimeout(() => {
            props.onClose(id);
        }, duration * 1000);
    }, []);

    let backgroundColor;
    let icon;

    if(type === PopupType.SUCCESS) {
        backgroundColor = "hsl(131, 59%, 52%)";
        icon = successIcon;
    }
    else {
        backgroundColor = "red";
        icon = failedIcon;
    }

    return (
        <div className={`${styles.popup} y-axis-flex`}>
            <div className={`${styles.popupBody} full-width x-axis-flex`}>
                <span 
                    className={`${styles.successIcon} x-axis-flex`}
                    style={{ backgroundColor }}
                >
                    { icon }
                </span>
                <p>{ message }</p>
                <span 
                    className={`${styles.close} x-axis-flex`}
                    onClick={e => props.onClose(id)}
                >
                    <FontAwesomeIcon icon={faXmark} />
                </span>
            </div>
            <div 
                className={`${styles.loaderContainer}`}
                style={{ backgroundColor }}
            ></div>
        </div>
    )
}

export default PopUp;