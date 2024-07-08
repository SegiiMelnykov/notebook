'use client';
import { Box, Card, Stack, Typography, useTheme } from '@mui/material';

import { TNote } from '@/types/notes';
import CompliteNoteAction from '../share/complite-note';
import Label from '@/components/label';
import AddTodoAction from '../share/add-note-todo';
import DeleteNoteAction from '../share/delete-note';
import { useRouter } from 'next/navigation';

import { paths } from '@/routes/paths';

type Props = { note: TNote };

export default function HomeTodoDayListItem({ note }: Props) {
  const navigeate = useRouter();

  const theme = useTheme();
  const isDeleted = note.deletedAt ? true : false;
  const isComplited = note.completed;

  const handleCardClick = () => {
    navigeate.push(paths.note(note.id));
  };

  return (
    <Card sx={{ p: { xs: 1, sm: 2 }, mt: 1 }} onClick={handleCardClick}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack>
          <Typography
            sx={{
              textDecoration:
                isComplited || isDeleted ? 'line-through' : 'none',
              textDecorationColor: isDeleted
                ? theme.palette.error.main
                : theme.palette.primary.main,
              color: isDeleted
                ? theme.palette.error.main
                : isComplited
                ? theme.palette.primary.main
                : '',
            }}
          >
            {note.title}
          </Typography>
        </Stack>
        <Stack direction={'row'} onClick={(e) => e.stopPropagation()}>
          {!isDeleted && (
            <>
              <CompliteNoteAction note={note} />
              {!isComplited && <AddTodoAction note={note} />}
              {!isComplited && <DeleteNoteAction note={note} />}
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );
}
