import { configureStore } from "@reduxjs/toolkit";
import trackListReducer from "./trackListSlice";

export const store = configureStore({
  reducer: {
    trackList: trackListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
