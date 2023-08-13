import { createSlice } from '@reduxjs/toolkit'
import { SessionStateInterface } from './interfaces/sessions.interface';

const sessionSliceName = 'session'

// source: https://www.freemindfulness.org/download;

const initialState: SessionStateInterface = {
    sessions: [
        {
            id: "sesssion-3",
            title: "Mindfulness of Breath (1)",
            description: "These short mindfulness exercises focus on bringing awareness to the process of breathing. As something that we are doing all of the time, watching our breath allows us to come into the present moment and practice being aware.",
            duration: "10:00",
            image: "https://i.ibb.co/71gS8pX/landscape.jpg",
            resource: ''
        },
        {
            id: "sesssion-4",
            title: "Mindfulness of Body (2)",
            description: "Body scan meditations invite you to move your focus of attention around the body, being curious about your experience and observing any sensations that you become aware of. This can be a helpful practice for developing awareness of the body and mind.",
            duration: "12:00",
            image: "https://i.ibb.co/W6sKxqk/stones.jpg",
            resource: ''
        },
    ],
    selectedSession: null,
}

export const sessionSlice = createSlice({
    name: sessionSliceName,
    initialState,
    reducers: {
        setSelectedSession(state, action) {
            state.selectedSession = action.payload;
        },
        resetSelectedSession(state) {
            state.selectedSession = null;
        }

    }
})

export const { setSelectedSession, resetSelectedSession } = sessionSlice.actions;

export default sessionSlice.reducer;
