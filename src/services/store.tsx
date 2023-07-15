import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import authSlice from "./auth";

const middlewareSlices = [
  authSlice.middleware,
]

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
    }).concat(...middlewareSlices),
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch