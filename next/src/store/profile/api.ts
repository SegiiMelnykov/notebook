import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Profile, ProfileForm } from '@/types/profile';

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }: { getState: () => any }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: (build) => ({
    getProfile: build.query<Profile, number>({
      query: (id) => ({
        url: `/profiles/${id}`,
        method: 'GET',
      }),
      providesTags: ['Profile'],
    }),
    updateProfile: build.mutation<void, { id: number; profile: ProfileForm }>({
      query: (body) => ({
        url: `/profiles/${body.id}`,
        method: 'PUT',
        body: body.profile,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
