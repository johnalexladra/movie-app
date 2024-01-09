"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WatchState {
  isWatch: boolean;
  isAdding: boolean;
}

const initialState: WatchState = {
  isWatch: false,
  isAdding: false,
};

const watchSlice = createSlice({
  name: 'watch',
  initialState,
  reducers: {
    setWatchStatus: (state, action: PayloadAction<boolean>) => {
      state.isWatch = action.payload;
    },
    setAddingStatus: (state, action: PayloadAction<boolean>) => {
      state.isAdding = action.payload;
    },
  },
});

export const { setWatchStatus, setAddingStatus } = watchSlice.actions;
export default watchSlice.reducer;
