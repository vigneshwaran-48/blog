"use client";

import React from 'react';
import styles from "./page.module.css";
import PopUp from './PopUp';
import { AppDispatch, RootState } from '@/lib/store';
import { Popup, deletePopup } from '@/lib/features/popup/popupSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';

const PopUpMessageContainer = () => {

    const popups: Popup[] = useAppSelector((state: RootState) => state.popupSlice.value);

    const dispatch: AppDispatch = useAppDispatch();

    const handlePopupClose = (id: string) => {
        dispatch(deletePopup(id));
    }

    const popupElems = popups.map(popup => {
        return <PopUp key={popup.id} popup={popup} onClose={handlePopupClose} />
    });

    return (
        <div className={`${styles.popupContainer} hide-scrollbar y-axis-flex`}>
            { popupElems }
        </div>
    )
}

export default PopUpMessageContainer;