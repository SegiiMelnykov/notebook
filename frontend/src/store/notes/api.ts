import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TNoteForm } from 'src/sections/note/add-edit-note-title-form';
import { TNote, TNoteExtendedForm, TReorderItem } from 'src/types/notes';
import { TTodo } from 'src/types/todo';

import { API_URL } from 'src/utils/consts';

export const notesApi = createApi({
  reducerPath: 'notesApi',
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
  tagTypes: ['Notes', 'Note', 'Home-list', 'Breadcrumbs', 'Todos'],
  endpoints: (build) => ({
    getNotes: build.query<
      { count: number; notes: TNote[] },
      {
        limit: string | number;
        page: string | number;
        filter: string;
        parentId: string;
      }
    >({
      query: (params) => ({
        url: `/notes/?page=${params.page}&limit=${params.limit}&filter=${
          params.filter
        }${params.parentId ? `&parentId=${params.parentId}` : ''}`,
        method: 'GET',
      }),
      providesTags: ['Notes'],
    }),
    getOneNote: build.query<TNote, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'GET',
      }),
      providesTags: ['Note'],
    }),
    getBreadcrambsNote: build.query<TNote[], string>({
      query: (id) => ({
        url: `/notes/${id}/breadcrumbs`,
        method: 'GET',
      }),
      providesTags: ['Breadcrumbs'],
    }),
    getNotesByNestedLevels: build.query<TNote[], null>({
      query: () => ({
        url: `/home/get-by-nested-level/`,
        method: 'GET',
      }),
      providesTags: ['Home-list'],
    }),
    addNote: build.mutation<string, TNoteForm>({
      query: (body) => ({
        url: `/notes/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notes', 'Home-list'],
    }),
    editNote: build.mutation<string, TNoteExtendedForm>({
      query: (body) => ({
        url: `/notes/${body.id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Notes', 'Home-list', 'Breadcrumbs', 'Note', 'Todos'],
    }),
    deleteNote: build.mutation<null, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Notes', 'Home-list', 'Todos'],
    }),
    compliteNote: build.mutation<null, string>({
      query: (id) => ({
        url: `/notes/complite/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Notes', 'Home-list', 'Note', 'Todos'],
    }),
    moveNote: build.mutation<
      null,
      {
        noteId: string;
        newParentId: string;
      }
    >({
      query: (body) => ({
        url: `/notes/move-note/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notes', 'Home-list', 'Note', 'Todos'],
    }),
    hideNote: build.mutation<null, string>({
      query: (id) => ({
        url: `/notes/hide/${id}`,
        method: 'POST',
      }),
      invalidatesTags: ['Home-list', 'Note', 'Notes', 'Todos'],
    }),
    addToTodo: build.mutation<
      null,
      {
        id: string;
        date: Date | null;
      }
    >({
      query: (body) => ({
        url: `/todos/`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Note', 'Todos'],
    }),
    getTodos: build.query<TTodo[], { date: string }>({
      query: (params) => ({
        url: `/todos?date=${params.date}`,
        method: 'GET',
      }),
      providesTags: ['Todos'],
    }),
    reorderList: build.mutation<null, TReorderItem[]>({
      query: (body) => ({
        url: `/notes/reorder`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Notes', 'Home-list'],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetOneNoteQuery,
  useGetBreadcrambsNoteQuery,
  useGetNotesByNestedLevelsQuery,
  useAddNoteMutation,
  useEditNoteMutation,
  useDeleteNoteMutation,
  useCompliteNoteMutation,
  useReorderListMutation,
  useHideNoteMutation,
  useAddToTodoMutation,
  useGetTodosQuery,
  useMoveNoteMutation,
} = notesApi;
