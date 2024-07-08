'use client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { jwtDecode } from 'jwt-decode';
import { User } from '@/types/user';

interface IState {
  token: string | null;
  user: User | null;
}

const initialState: IState = {
  token:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('token') ?? 'null')
      : null,
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') ?? 'null')
      : null,
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.user = { ...(jwtDecode(action.payload.token) as User) };
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      localStorage.setItem(
        'user',
        JSON.stringify({ ...jwtDecode(action.payload.token) }),
      );
    },
    logOut: (state, action: PayloadAction<any>) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const authActions = auth.actions;
export const authReducer = auth.reducer;
