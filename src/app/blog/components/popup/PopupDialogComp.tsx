import React, { useState } from 'react';
import styles from "./popupDialog.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { PopupDialog, PopupDialogType, closeDialog } from '@/lib/features/popup/popupDialogSlice';
import { AppFields } from '@/util/AppFields';

const PopupDialogComp = () => {

    const [ showDialog, setShowDialog ] = useState<boolean>(false);

    const popupDialog: PopupDialog = useAppSelector(state => state.popupDialogSlice.value);

    const { message, title, openDialog } = popupDialog;

    const dispatch = useAppDispatch();

    const isWarning: boolean = popupDialog.type === PopupDialogType.WARNING;

    const handleProceed = () => {
        const event = new Event(AppFields.Events.Popup.onProceed);
        dispatch(closeDialog());
        document.dispatchEvent(event);
    }

    const handleClose = () => {
        const event = new Event(AppFields.Events.Popup.onCancel);
        dispatch(closeDialog());
        document.dispatchEvent(event);
    }

    return (
        <div className={`${styles.dialogContainerPage} ${openDialog ? styles.showDialog : ""} full-body x-axis-flex`}>
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