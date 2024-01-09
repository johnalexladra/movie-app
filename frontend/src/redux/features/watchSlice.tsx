'use client';

import { createSlice } from '@reduxjs/toolkit';

export const watchSlice = createSlice({
  name: 'watch',
  initialState: {
    movies: [],
  },
  reducers: {
    setWatchMovies: (state, action) => {
      state.movies = action.payload;
    },
    // Add other reducers as needed
  },
});

export const { setWatchMovies } = watchSlice.actions;
export default watchSlice.reducer;
