import { createSlice } from "@reduxjs/toolkit";

const authingSliceName = 'auth'
const initialState: { token: string } = {
    token: '',
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
        }
    }
})
export const { setToken, resetToken } = authSlice.actions;
export default authSlice.reducer;
