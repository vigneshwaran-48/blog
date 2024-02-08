import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState = {
    content: "",
    title: "",
    image: "/person.jpg"
}

const composeSlice = createSlice({
    name: "composeSlice",
    initialState,
    reducers: {
        setContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload;
        },
        setTitle: (state, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        setBlogImage: (state, action: PayloadAction<string>) => {
            state.image = action.payload;
        }
    }
})

export const { setContent, setTitle, setBlogImage } = composeSlice.actions;
export default composeSlice.reducer;