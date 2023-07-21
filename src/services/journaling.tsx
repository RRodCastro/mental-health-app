import { createSlice } from '@reduxjs/toolkit'

const journalingSliceName = 'journaling'

const initialState = {
    selectedEntry: null,
}

export const journalSlice = createSlice({
    name: journalingSliceName,
    initialState,
    reducers: {
        setSelectedEntry(state, action) {
            state.selectedEntry = action.payload;
        },
        resetSelectedEntry(state) {
            state.selectedEntry = null;
        }
    }
})

export const { setSelectedEntry, resetSelectedEntry } = journalSlice.actions;

export default journalSlice.reducer;
