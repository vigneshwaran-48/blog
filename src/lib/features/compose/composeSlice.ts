import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface Compose {
    content: string,
    title: string,
    image: string,
}

const initialState: Compose = {
    content: "",
    title: "",
    image: "/blog-banner.jpg",
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
        },
        clearBlog: (state) => {
            state.content = "";
            state.title = "";
            state.image = "/blog-banner.jpg";
        }
    }
})

export const { setContent, setTitle, setBlogImage, clearBlog } = composeSlice.actions;
export default composeSlice.reducer;