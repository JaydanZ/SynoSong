import { configureStore } from "@reduxjs/toolkit";
import storage from "./storage";
import { combineReducers } from "redux";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import trackListReducer from "./trackListSlice";
import playlistReducer from "./playlistSlice";

const persistConfig = {
  timeout: 100,
  key: "playlist",
  storage,
};

const combinedReducer = combineReducers({
  trackList: trackListReducer,
  playlist: playlistReducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
