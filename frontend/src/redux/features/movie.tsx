"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MovieState {
  isFavorite: boolean;
  isAdding: boolean;
}

const initialState: MovieState = {
  isFavorite: false,
  isAdding: false,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setFavoriteStatus: (state, action: PayloadAction<boolean>) => {
      state.isFavorite = action.payload;
    },
    setAddingStatus: (state, action: PayloadAction<boolean>) => {
      state.isAdding = action.payload;
    },
  },
});

export const { setFavoriteStatus, setAddingStatus } = movieSlice.actions;
export default movieSlice.reducer;
