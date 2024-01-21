import { PopupType } from "@/app/blog/components/popup/PopUp";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Popup {
    id: string,
    type: PopupType,
    message?: string,
    duration?: number,
}

const initialState: Popup[] = [];

// Without wrapping the state in a value object, The Components are not re rendering
const popupSlice = createSlice({
    name: "popupSlice",
    initialState: { value: initialState },
    reducers: {
        addPopup: (state, action: PayloadAction<Popup>) => {
            console.log("Adding popup slice");
            state.value = [...state.value, action.payload];
        },
        deletePopup: (state, action: PayloadAction<string>) => {
            state.value = state.value.filter(popup => popup.id !== action.payload);
        }
    }
})

export const { addPopup, deletePopup } = popupSlice.actions;
export default popupSlice.reducer;