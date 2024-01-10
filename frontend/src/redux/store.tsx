"use client";

import { configureStore } from '@reduxjs/toolkit';
import favoriteButtonReducer from './features/favoriteButtonSlice';
import favoritesReducer from './features/favoriteSlice';
import watchButtonReducer from './features/watchButtonSlice';
import watchReducer from './features/watchSlice';
import signupReducer from './features/signupSlice';
import userReducer from './features/userSlice';

const store = configureStore({
  reducer: {
    favoriteButton: favoriteButtonReducer,
    favorites: favoritesReducer,
    watchButton: watchButtonReducer,
    watch: watchReducer,
    signup: signupReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
