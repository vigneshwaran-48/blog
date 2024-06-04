import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Notification } from "@/util/AppTypes";

type stateType = {
    notifications: Notification[]
}

export const initialState: stateType = {
    notifications: []
}

const notificationSlice = createSlice({
    name: "notificationSlice",
    reducers: {
        setNotifications: (state, action: PayloadAction<Notification[]>) => {
            state.notifications = action.payload;
        }
    },
    initialState
});

export const { setNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
