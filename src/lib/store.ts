import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/user/userSlice";
import popupSlice from "./features/popup/popupSlice";
import popupDialogSlice from "./features/popup/popupDialogSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            userSlice,
            popupSlice,
            popupDialogSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"];