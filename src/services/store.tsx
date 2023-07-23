import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import journalingReducer from "./journaling";
import sessionReducer from "./sessions";

import authSlice from "./auth";

const middlewareSlices = [
  authSlice.middleware,
]

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    journal: journalingReducer, 
    session: sessionReducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(...middlewareSlices),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch