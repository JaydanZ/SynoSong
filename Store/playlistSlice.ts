import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { playlistItem } from "../types/types";

export interface playlistState {
  playlist: playlistItem[];
}

const initialState: playlistState = {
  playlist: [],
};

export const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<playlistItem>) => {
      if (state.playlist === undefined) {
        // First item of playlist
        const tempPlaylist = [];
        tempPlaylist.push(action.payload);
        state.playlist = tempPlaylist;
      } else {
        // Playlist exists, add item to end of array
        state.playlist = [...state.playlist, action.payload];
      }
    },

    remove: (state, action: PayloadAction<string>) => {
      // Check if playlist contains track
      const tempPlaylist = state.playlist?.filter(
        (track) => track.id !== action.payload
      );
      state.playlist = tempPlaylist;
    },

    clear: (state) => {
      // Clear playlist array
      state.playlist = [];
    },
  },
});

// Actions for each reducer function
export const { add, remove, clear } = playlistSlice.actions;

export const selectPlaylist = (state: RootState) => state.playlist.playlist;

export default playlistSlice.reducer;
