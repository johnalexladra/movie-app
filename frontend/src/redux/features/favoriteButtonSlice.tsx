"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteState {
  isFavorite: boolean;
  isAdding: boolean;
}

const initialState: FavoriteState = {
  isFavorite: false,
  isAdding: false,
};

const favoriteSlice = createSlice({
  name: 'favorite',
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

export const { setFavoriteStatus, setAddingStatus } = favoriteSlice.actions;
export default favoriteSlice.reducer;
