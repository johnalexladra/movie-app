
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  // ... other user properties
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      // Implement logic to edit user
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      // Implement logic to delete user
    },
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { addUser, editUser, deleteUser, setUsers } = userSlice.actions;
export const selectUsers = (state: RootState) => state.user.users;
export default userSlice.reducer;
