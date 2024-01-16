import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum PopupDialogType {
    INFO, WARNING
}

export interface PopupDialog {
    type: PopupDialogType,
    message: string,
    title: string,
    openDialog: boolean
}

const initialState: PopupDialog = {
    type: PopupDialogType.INFO,
    title: "Info!",
    message: "Blog app",
    openDialog: false
};

const popupDialogSlice = createSlice({
    name: "popupDialogSlice",
    initialState: { value: initialState },
    reducers: {
        addPopupDialog: (state, action: PayloadAction<PopupDialog>) => {
            state.value = action.payload;
        },
        closeDialog: (state, action: PayloadAction) => {
            state.value.openDialog = false;
        }
    }
});

export const { addPopupDialog, closeDialog } = popupDialogSlice.actions;
export default popupDialogSlice.reducer;