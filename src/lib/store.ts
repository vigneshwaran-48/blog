import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./features/user/userSlice";
import popupSlice from "./features/popup/popupSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            userSlice,
            popupSlice
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"];