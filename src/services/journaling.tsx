import { createSlice } from '@reduxjs/toolkit'
import { JournalingStateInterface } from './interfaces/journaling.interface';

const journalingSliceName = 'journaling'

const initialState: JournalingStateInterface = {
    selectedEntry: null,
    selectedKeysFromCalendar: [],
    entries: [
        {
            key: 'entry-0',
            date: new Date(),
            description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
            tags: ["anxiety", "stress", "school"]
        },
        {
            key: 'entry-1',
            date: new Date(),
            description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-2',
            date: new Date(),
            description: "Today I felt very energetic during the morning but a call with a friend made feel...",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-3',
            date: new Date(),
            description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
            tags: ["anxiety", "stress", "school"]
        },
        {
            key: 'entry-4',
            date: new Date(),
            description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-5',
            date: new Date(),
            description: "Today I felt very energetic during the morning but a call with a friend made feel...",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-6',
            date: new Date(),
            description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
            tags: ["anxiety", "stress", "school"]
        },
        {
            key: 'entry-7',
            date: new Date(),
            description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-8',
            date: new Date(),
            description: "Today I felt very energetic during the morning but a call with a friend made feel...",
            tags: ["anxiety", "stress", "school"]
        }
    ]
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
            state.selectedKeysFromCalendar = action.payload;
        },
        addNewEntry(state, action) {
            state.entries.push(action.payload);
        }
    }
})

export const { setSelectedEntry, resetSelectedEntry, setSelectedKeysFromCalendar, addNewEntry } = journalSlice.actions;

export default journalSlice.reducer;
