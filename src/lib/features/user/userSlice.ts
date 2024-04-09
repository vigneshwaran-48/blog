import { UserMeta } from "@/util/AppTypes";
import { PayloadAction, createSlice } from "@reduxjs/toolkit"

export const initialState: UserMeta = {
    name: "Guest",
    image: "/person.jpg",
    id: "test-001",
    email: "guest@guest.com",
    profileId: "test-001",
    isLoggedIn: false,
    showLoginPopup: false
}

const userSlice = createSlice({
    name: "userSlice",
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            const name = action.payload;
            state.name = name;
        },
        setImage: (state, action: PayloadAction<string>) => {
            const image = action.payload;
            state.image = image;
        },
        setUser: (state, action: PayloadAction<UserMeta>) => {
            console.log(action.payload);
            // Setting all values separately then only it is getting reflected in the store.
            state.name = action.payload.name;
            state.image = action.payload.image;
            state.description = action.payload.description;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.profileId = action.payload.profileId || action.payload.id;
            state.isLoggedIn = action.payload.isLoggedIn;
        },
        setLoginPopup: (state, action: PayloadAction<boolean>) => {
            state.showLoginPopup = action.payload;
        }
    },
    initialState
});

export const { setName, setImage, setUser, setLoginPopup } = userSlice.actions;
export default userSlice.reducer;
