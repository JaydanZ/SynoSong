import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { trackListObj } from "../types/types";
import { RootState } from "./store";

export interface trackListState {
  list: trackListObj;
}

const initialState: trackListState = {
  list: [],
};

export const trackListSlice = createSlice({
  name: "trackList",
  initialState,
  reducers: {
    insertList: (state, action: PayloadAction<trackListObj>) => {
      state.list = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { insertList } = trackListSlice.actions;

// Selector
export const selectTrackList = (state: RootState) => state.trackList.list;

export default trackListSlice.reducer;
