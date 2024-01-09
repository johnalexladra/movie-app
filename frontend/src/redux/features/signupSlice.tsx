"use client";

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  data: UserData | null;
}

const initialState: UserState = {
  data: null,
};

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
    resetUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, resetUser } = signupSlice.actions;
export default signupSlice.reducer;
