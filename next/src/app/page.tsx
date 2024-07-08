'use client';

import HomeNotesView from '@/sections/home/view/home-notes-view';
import HomeTodoView from '@/sections/home/view/home-todo-view';
import { Typography } from '@mui/material';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {}, []);
  return (
    <main>
      <Typography
        variant='h3'
        sx={{ textAlign: 'center', textTransform: 'capitalize' }}
      >
        Workspace
      </Typography>
      <HomeTodoView />
      <HomeNotesView />
    </main>
  );
}
