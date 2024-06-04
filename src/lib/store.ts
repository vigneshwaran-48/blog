import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import popupSlice from "./features/popup/popupSlice";
import preferencesSlice from "./features/settings/preferencesSlice";
import composeSlice from "./features/compose/composeSlice";
import searchSlice from "./features/search/searchSlice";
import tagSlice from "./features/tags/tagSlice";
import notificationSlice from "./features/notification/notificationSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            userSlice,
            popupSlice,
            preferencesSlice,
            composeSlice,
            searchSlice,
            tagSlice,
            notificationSlice
        }
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"];