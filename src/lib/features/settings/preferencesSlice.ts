import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export type Theme = "DARK" | "LIGHT";

export interface Prefernces {
    lang: string,
    theme: Theme
}

const initialState: Prefernces = {
    lang: "en",
    theme: "DARK"
}

const preferenceSlice = createSlice({
    name: "preferenceSlice",
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<string>) => {
            state.lang = action.payload;
        },
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        }
    }
});

export const { setLanguage, setTheme } = preferenceSlice.actions;
export default preferenceSlice.reducer;
