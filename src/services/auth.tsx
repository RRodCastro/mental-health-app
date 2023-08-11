import { createSlice } from "@reduxjs/toolkit";

const authingSliceName = 'auth'
const initialState: { token: string, userId: string } = {
    token: '',
    userId: '',
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
        }

    }
})
export const { setToken, resetToken, setUserId, resetUserId } = authSlice.actions;
export default authSlice.reducer;
