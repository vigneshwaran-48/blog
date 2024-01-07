import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface User {
    name: string,
    image: string,
    loggedIn: boolean
}

export const initialState: User = {
    name: "Guest",
    image: "/person.jpg",
    loggedIn: false
}

const userSlice = createSlice({
    name: "userSlice",
    reducers: {
        setLoggenInStatus: (state, action: PayloadAction<User>) => {
            const { loggedIn } = action.payload;
            state.loggedIn = loggedIn;
        },
        setName: (state, action: PayloadAction<User>) => {
            const { name } = action.payload;
            state.name = name;
        },
        setImage: (state, action: PayloadAction<User>) => {
            const { image } = action.payload;
            state.image = image;
        }
    },
    initialState
});

export const { setLoggenInStatus, setName, setImage } = userSlice.actions;
export default userSlice.reducer;
