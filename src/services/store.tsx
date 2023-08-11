import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import journalingReducer, { journalSlice } from "./journaling";
import sessionReducer from "./sessions";
import authReducer from './auth';

import {authSlice, tokenSlice} from "./auth.api";

import journalingApi from "./journaling.api";

const middlewareSlices = [
  authSlice.middleware,
  tokenSlice.middleware,
  journalingApi.middleware,
]

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    journal: journalingReducer, 
    session: sessionReducer,
    auth: authReducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [tokenSlice.reducerPath]: tokenSlice.reducer,
    [journalingApi.reducerPath]: journalingApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      serializableCheck: false,
    }).concat(...middlewareSlices),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch