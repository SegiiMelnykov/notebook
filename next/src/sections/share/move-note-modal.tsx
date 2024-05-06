import { CustomDialog } from '@/components/custom-dialog';
import { LoadingButton } from '@mui/lab';
import { useGetNotesQuery, useMoveNoteMutation } from '@/store/notes/api';
import { pageLimit } from '@/utils/consts';
import { useState } from 'react';
import { Button, Card, Stack, Typography } from '@mui/material';

type Props = {
  onclose: () => void;
  noteId: string;
};

export default function MoveNote({ onclose, noteId }: Props) {
  const [move] = useMoveNoteMutation();
  const [selectedNote, setSelectedNote] = useState('');
  const [parentId, setParentId] = useState('');
  const [prevParentId, setPrevParentId] = useState<string[]>(['']);
  const [page, setPage] = useState(1);
  const { data, isSuccess, refetch } = useGetNotesQuery({
    limit: pageLimit,
    page: page,
    filter: 'active',
    parentId: parentId,
  });

  const handleGetCategory = (id: string) => {
    setPrevParentId((prev: any) => [...prev, id]);
    setParentId(id);
  };
  const handleBack = () => {
    const id = prevParentId[prevParentId.length - 1];
    setParentId(id);
    setPrevParentId((prev) => [...prev.filter((el) => el !== id)]);
  };
  const handleSelect = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (selectedNote === id) {
      setSelectedNote('');
    } else {
      setSelectedNote(id);
    }
  };
  const handleMoveNote = (event: React.MouseEvent) => {
    move({
      noteId: noteId,
      newParentId: selectedNote,
    })
      .then(() => refetch())
      .catch((e) => console.log(e))
      .finally(() => onclose());
  };

  return (
    <>
      <CustomDialog
        onClose={onclose}
        open={true}
        title={'Move Note to'}
        action={
          <LoadingButton
            type='button'
            onClick={handleMoveNote}
            variant='contained'
            loading={false}
            disabled={selectedNote.length < 1}
          >
            Move
          </LoadingButton>
        }
      >
        {data && isSuccess ? (
          <>
            <Button
              variant='outlined'
              disabled={prevParentId.length < 1}
              onClick={handleBack}
              sx={{ mb: 2, mt: 1 }}
            >
              Back
            </Button>
            <Stack spacing={2} mb={2}>
              {data.notes.map((note) => (
                <Card
                  key={note.id}
                  onClick={() => handleGetCategory(note.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Stack
                    p={2}
                    spacing={1}
                    direction={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography>{note.title}</Typography>
                    <Button
                      variant={
                        selectedNote === note.id ? 'contained' : 'outlined'
                      }
                      onClick={(e) => handleSelect(e, note.id)}
                    >
                      Select
                    </Button>
                  </Stack>
                </Card>
              ))}
            </Stack>
          </>
        ) : (
          <p>No notes found</p>
        )}
      </CustomDialog>
    </>
  );
}
