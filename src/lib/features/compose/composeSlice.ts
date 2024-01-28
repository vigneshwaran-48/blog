import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    content: ""
}

const composeSlice = createSlice({
    name: "composeSlice",
    initialState,
    reducers: {
        setContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload;
        }
    }
})

export const { setContent } = composeSlice.actions;
export default composeSlice.reducer;