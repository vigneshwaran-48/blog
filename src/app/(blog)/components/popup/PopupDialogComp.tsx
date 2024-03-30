import React, { useContext, useState } from 'react';
import styles from "./popupDialog.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { PopupDialogState, PopupDialogType, PopupModelContextProvider } from './PopupModelProvider';

const PopupDialogComp = (props: PopupDialogState) => {

    const { message, title, open, type, onClose, onProceed = () => {} } = props;

    const popupContext = useContext(PopupModelContextProvider);

    const isWarning = type === PopupDialogType.WARNING;

    const handleProceed = () => {
        onProceed();
        popupContext.closePopup();
    }

    const handleClose = () => {
        onClose();
        popupContext.closePopup();
    }

    return (
        <div className={`${styles.dialogContainerPage} ${open ? styles.showDialog : ""} full-body x-axis-flex`}>
            <div className={`${styles.background} full-body`}></div>
            <div 
                className={`${styles.dialogContainer} y-axis-flex`}
            >
                <div className={`${styles.popupDialogBody} full-width x-axis-flex`}>
                    {
                        isWarning ? (
                            <span className={`x-axis-flex`}><FontAwesomeIcon icon={faTriangleExclamation} /></span>
                        ) : (
                            <span className={`${styles.infoIcon} x-axis-flex`}>
                                <FontAwesomeIcon icon={faInfo} />
                            </span>
                        )
                    }
                    <h2>{ title }</h2>
                </div>
                <p>
                    { message }
                </p>
                <div className={`${styles.buttonContainer} x-axis-flex full-width`}>
                    { isWarning ? 
                    (<button 
                        className={`${styles.cancelButton} button`}
                        onClick={handleClose}
                    >Cancel</button>) : ""}
                    <button 
                        className={`${styles.processButton} button`}
                        onClick={e => handleProceed()}
                    >Proceed</button>
                </div>
            </div>
        </div>
    )
}

export default PopupDialogComp;