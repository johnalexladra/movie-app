'use client';

import { createSlice } from '@reduxjs/toolkit';

export const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    movies: [],
    series: [],
  },
  reducers: {
    setFavoriteMovies: (state, action) => {
      state.movies = action.payload;
    },
    setFavoriteSeries: (state, action) => {
      state.series = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setFavoriteMovies, setFavoriteSeries } = favoriteSlice.actions;
export default favoriteSlice.reducer;
