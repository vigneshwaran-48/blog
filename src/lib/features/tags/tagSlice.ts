import { Tag } from "@/util/AppTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: Tag[] = [];

const tagSlice = createSlice({
    name: "tagSlice",
    initialState,
    reducers: {
        setTags: (state, action: PayloadAction<Tag[]>) => {
            state.length = 0;
            state.push(...action.payload);
        }
    }
});

export const { setTags } = tagSlice.actions;
export default tagSlice.reducer;