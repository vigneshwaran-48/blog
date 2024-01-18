import React, { createContext, useState } from 'react';
import PopupDialogComp from './PopupDialogComp';

interface Props {
    children: React.ReactNode
}

export enum PopupDialogType {
    WARNING,
    INFO
}

export interface PopupDialogState {
    message: string,
    title: string,
    open: boolean,
    onClose: () => void,
    onProceed: () => any,
    type: PopupDialogType
};

interface contextProps {
    setPopupModelState: (state: PopupDialogState) => void,
    closePopup: () => void
}

export const PopupModelContextProvider = createContext<contextProps>({
    setPopupModelState: () => {},
    closePopup: () => {}
});

const PopupModelProvider = ({ children }: Props) => {

    const [ popupModelState, setPopupModelState ] = useState<PopupDialogState>({
        message: "This is an Info",
        type: PopupDialogType.INFO,
        onClose: () => {},
        onProceed: () => {},
        title: "Info",
        open: false
    });

    const handlePopupModelStateChange = (state: PopupDialogState) => {
        setPopupModelState(state);
    }

    const closePopup = () => {
        setPopupModelState(prev => ({ ...prev, open: false }));
    }

    return (
        <PopupModelContextProvider.Provider value={{
            setPopupModelState: handlePopupModelStateChange,
            closePopup
        }}>
            { children }

            <PopupDialogComp {...popupModelState} />
        </PopupModelContextProvider.Provider>
    )
}

export default PopupModelProvider;