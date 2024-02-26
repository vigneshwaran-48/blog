import { ProfileId } from "@/util/AppTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface StateType {
    value: ProfileId[]
}
const initialState: StateType = { 
    value: []
};

const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<ProfileId[]>) => {
            state.value = [...action.payload];
        }
    }
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;