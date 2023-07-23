import { createSlice } from '@reduxjs/toolkit'
import { JournalingStateInterface } from './interfaces/journaling.interface';
import { DateTime } from 'luxon'

const journalingSliceName = 'journaling'
const yesterday = (DateTime.local().minus({ days: 1 }).toJSDate());
const pastDay = (DateTime.local().minus({ days: 3 })).toJSDate();
const today = (DateTime.now().toJSDate());

const initialState: JournalingStateInterface = {
    selectedEntry: null,
    selectedKeysFromCalendar: [],
    entries: [
        {
            key: 'entry-0',
            date: pastDay,
            description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
            tags: ["anxiety", "stress", "school"]
        },
        {
            key: 'entry-1',
            date: pastDay,
            description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-2',
            date: pastDay,
            description: "Today I felt very energetic during the morning but a call with a friend made feel...",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-3',
            date: yesterday,
            description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
            tags: ["anxiety", "stress", "school"]
        },
        {
            key: 'entry-4',
            date: yesterday,
            description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-5',
            date: yesterday,
            description: "Today I felt very energetic during the morning but a call with a friend made feel...",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-6',
            date: today,
            description: "I can't believe how quickly this semester has flown by. I'm already starting to feel anxious about the upcoming exams",
            tags: ["anxiety", "stress", "school"]
        },
        {
            key: 'entry-7',
            date: today,
            description: "I had a rush morning but after walking in the nature I felt more calmed during the day which",
            tags: ["anxiety", "stress", "school"]


        },
        {
            key: 'entry-8',
            date: today,
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
            const maxKey = Math.max(...state.entries.map((entry) => parseInt(entry.key.replace("entry-", ""))));
            state.entries.push({...action.payload, key: 'entry-' + (maxKey + 1)});
        }
    }
})

export const { setSelectedEntry, resetSelectedEntry, setSelectedKeysFromCalendar, addNewEntry } = journalSlice.actions;

export default journalSlice.reducer;
