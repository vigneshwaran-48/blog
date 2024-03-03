import { Blog, ProfileId } from "@/util/AppTypes";
import { getStaticResourceRoutes } from "@/util/ResourceServer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export interface Compose {
    content: string,
    title: string,
    image: string,
    isEdit: boolean,
    id?: number,
    isSaving: boolean,
    publised: boolean,
    publishedAt: ProfileId | null
}

const defaultImage = getStaticResourceRoutes().getOne(552);

const initialState: Compose = {
    content: "",
    title: "",
    image: defaultImage,
    isEdit: false,
    isSaving: false,
    publised: false,
    publishedAt: null
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
            state.image = defaultImage;
            state.isEdit = false;
            state.isSaving = false;
        },
        setBlog: (state, action: PayloadAction<Blog>) => {
            state.content = action.payload.content;
            state.title = action.payload.title;
            state.image = action.payload.image;
            state.id = action.payload.id;
            state.publised = action.payload.publised || false;
            state.publishedAt = action.payload.publishedAt || null
        },
        setEditMode: (state, action: PayloadAction<boolean>) => {
            state.isEdit = action.payload;
        },
        setIsSaving: (state, action: PayloadAction<boolean>) => {
            state.isSaving = action.payload;
        },
        setPublished: (state, action: PayloadAction<boolean>) => {
            state.publised = action.payload;
        }
    }
})

export const { 
    setContent, 
    setTitle, 
    setBlogImage, 
    clearBlog, 
    setBlog, 
    setEditMode, 
    setIsSaving,
    setPublished
} = composeSlice.actions;
export default composeSlice.reducer;