import { createSlice } from '@reduxjs/toolkit'

const journalingSliceName = 'journaling'

const initialState = {
    selectedEntry: null,
    selectedKeysFromCalendar: [],
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
        },
        setSelectedKeysFromCalendar(state, action) {
            console.log("Selecting.... ", action.payload);
            
            state.selectedKeysFromCalendar = action.payload;
        }
    }
})

export const { setSelectedEntry, resetSelectedEntry, setSelectedKeysFromCalendar } = journalSlice.actions;

export default journalSlice.reducer;
