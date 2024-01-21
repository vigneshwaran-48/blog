import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import popupSlice from "./features/popup/popupSlice";
import preferencesSlice from "./features/settings/preferencesSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            userSlice,
            popupSlice,
            preferencesSlice
        }
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"];