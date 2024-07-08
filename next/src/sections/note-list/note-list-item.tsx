'use client';
import { Box, Card, Stack, Typography } from '@mui/material';
import { TNote } from '@/types/notes';
import Label from '@/components/label/label';
import { paths } from '@/routes/paths';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import NoteActionBlock from '../note/note-action-block';
import Link from 'next/link';

// sections

// ----------------------------------------------------------------------

type Props = {
  value: TNote;
  isDraggable?: boolean;
};

const NoteListItem = ({ value, isDraggable = true }: Props) => {
  return (
    <Link href={paths.note(value.id)} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          mt: 2,
          py: { xs: 1, sm: 2 },
          px: { xs: 0.5, sm: 2 },
          cursor: 'pointer',
        }}
      >
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'space-between'}
          gap={2}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            spacing={2}
            maxWidth={'50%'}
          >
            {isDraggable && <DragIndicatorIcon />}
            <Box>
              <Typography variant='h6'>{value.title}</Typography>
              <Typography variant='caption'>
                <Label color={'primary'}>
                  {new Date(value.createdAt).toLocaleDateString()}
                </Label>
              </Typography>
              {!!value.deletedAt && <Label color={'error'}>deleted</Label>}
            </Box>
          </Stack>

          <Stack
            direction={'row'}
            justifyContent={'flex-end'}
            flexWrap={'wrap'}
            maxWidth={'50%'}
          >
            <NoteActionBlock note={value} />
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
};

export default NoteListItem;
