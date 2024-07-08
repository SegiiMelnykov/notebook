import { Typography } from '@mui/material';
import NoteListView from '@/sections/note-list/view/note-list-view';

// sections

// ----------------------------------------------------------------------

export default function NoteListPage() {
  return (
    <>
      <Typography variant='h3' textAlign={'center'}>
        My notes
      </Typography>
      <NoteListView />
    </>
  );
}
