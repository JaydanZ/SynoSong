import { configureStore } from "@reduxjs/toolkit";
import trackListReducer from "./trackListSlice";
import playlistReducer from "./playlistSlice";

export const store = configureStore({
  reducer: {
    trackList: trackListReducer,
    playlist: playlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
