import { PayloadAction, createSlice } from "@reduxjs/toolkit"


export interface User {
    name: string,
    image: string,
    id: string
}

export const initialState: User = {
    name: "Guest",
    image: "/person.jpg",
    id: "test-001"
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
        setUser: (state, action: PayloadAction<User>) => {
            state = action.payload;
        }
    },
    initialState
});

export const { setName, setImage, setUser } = userSlice.actions;
export default userSlice.reducer;
