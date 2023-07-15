import { createSlice } from '@reduxjs/toolkit'

const counterSliceName = 'counter'

const initialState = {
    value: 0
}

export const counterSlice = createSlice({
    name: counterSliceName,
    initialState,
    reducers:{
        increment(state) {
            state.value += 1;
        },
        decrement(state) {
            state.value -= 1;
        }
    }
})

export const {increment,decrement} = counterSlice.actions;

export default counterSlice.reducer
