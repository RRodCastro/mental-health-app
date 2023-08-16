import { createSlice } from "@reduxjs/toolkit";

const authingSliceName = 'auth'
const initialState: { token: string, userId: string, isUnauthorized: boolean } = {
    token: '',
    userId: '',
    isUnauthorized: false
}

export const authSlice = createSlice({
    name: authingSliceName,
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetToken: (state) => {
            state.token = initialState.token;
        },
        setUserId: (state, action) => {
            state.userId = action.payload;
        },
        resetUserId: (state) => {
            state.userId = initialState.userId;
        },
        setIsUnauthorized: (state, action) => { 
            state.isUnauthorized = action.payload;
        }

        

    }
})
export const { setToken, resetToken, setUserId, resetUserId, setIsUnauthorized } = authSlice.actions;
export default authSlice.reducer;
