import { configureStore } from "@reduxjs/toolkit";
import storageSession from "reduxjs-toolkit-persist/lib/storage/session";
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
import thunk from "redux-thunk";
import trackListReducer from "./trackListSlice";
import playlistReducer from "./playlistSlice";

const persistConfig = {
  timeout: 100,
  key: "playlist",
  storage: storageSession,
};

const combinedReducer = combineReducers({
  trackList: trackListReducer,
  playlist: playlistReducer,
});
const persistedReducer = persistReducer(persistConfig, combinedReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
