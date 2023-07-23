import { createSlice } from '@reduxjs/toolkit'
import { SessionStateInterface } from './interfaces/sessions.interface';

const sessionSliceName = 'session'

// source: https://www.freemindfulness.org/download;

const initialState: SessionStateInterface = {
    sessions: [
        {
            key: "sesssion-1",
            title: "Mindfulness of Breath",
            description: "These short mindfulness exercises focus on bringing awareness to the process of breathing. As something that we are doing all of the time, watching our breath allows us to come into the present moment and practice being aware.",
            duration: "10:00",
            image: "https://lh4.googleusercontent.com/qPLqKLE-OnhmOsUDg3Q5uJhfbO3z7G48LAV0l47kKzj71eziV9hmZNdbav4CvEYetOokOD6OEetrjtAwyQYz4FQL0Mz4SSuffanuUNNZM_y-BDboYfo9yALAqakz4QlycQ=w1280"
        },
        {
            key: "sesssion-2",
            title: "Mindfulness of Body",
            description: "Body scan meditations invite you to move your focus of attention around the body, being curious about your experience and observing any sensations that you become aware of. This can be a helpful practice for developing awareness of the body and mind.",
            duration: "12:00",
            image: "https://lh3.googleusercontent.com/KeIhrvFnmlZe7uIwwgrgpol7dcapxFXjncYxXWkOWtlAFi8bGV4LLdCaF-h_KWUkcv5_BH-5HiLWon2VNjPvhBGC97NhdjQcv63P3mGAis5qNRHtIJzJZi5lRTWkrWHxvw=w1280"
        },
    ]
}

export const sessionSlice = createSlice({
    name: sessionSliceName,
    initialState,
    reducers: {
       
    }
})

export const {  } = sessionSlice.actions;

export default sessionSlice.reducer;
