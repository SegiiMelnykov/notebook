'use client';
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/auth.api';

import { authReducer } from './auth/auth.slice';
import { notesApi } from './notes/api';
import { noteReducer } from './notes/note.slice';
import { profileApi } from './profile/api';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [notesApi.reducerPath]: notesApi.reducer,
    note: noteReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      notesApi.middleware,
      profileApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
