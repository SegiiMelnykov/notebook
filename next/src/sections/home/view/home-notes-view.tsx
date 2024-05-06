'use client';
import { SplashScreen } from '@/components/loading-screen';
import { useAppSelector } from '@/hooks/use-redux';
import {
  useGetNotesByNestedLevelsQuery,
  useGetTodosQuery,
} from '@/store/notes/api';
import HomeList from '../list';
import { Typography } from '@mui/material';

export default function HomeNotesView() {
  const { user } = useAppSelector((state) => state.auth);

  const {
    data: notes,
    isLoading,
    isSuccess,
  } = useGetNotesByNestedLevelsQuery(null, {
    skip: !user,
  });

  if (isLoading) return <SplashScreen />;

  if (isSuccess)
    return (
      <>
        <Typography variant='h3'>Notes</Typography>
        <HomeList list={notes} />
      </>
    );

  return null;
}
