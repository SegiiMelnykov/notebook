import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { FormValuesProps } from '@/sections/auth/auth-form';
import { User } from '@/types/user';
import { API_URL } from '@/utils/consts';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/user',
  }),
  tagTypes: ['Auth'],
  endpoints: (build) => ({
    registration: build.mutation<FormValuesProps, any>({
      query: (body) => ({
        url: `/registration`,
        method: 'POST',
        body,
      }),
    }),
    login: build.mutation<FormValuesProps, any>({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
        body,
      }),
    }),
    auth: build.query<any, null>({
      query: () => ({
        url: `/auth`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token')
            ? `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}`
            : '',
        },
      }),
      providesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useAuthQuery } =
  authApi;
