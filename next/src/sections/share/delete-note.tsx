import { IconButton } from '@mui/material';
import { TNote } from '@/types/notes';

import { useDeleteNoteMutation } from '@/store/notes/api';
import { useBoolean } from '@/hooks/use-boolean';
import { ConfirmDialog } from '@/components/custom-dialog';
import { Button } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function DeleteNoteAction({ note }: TProps) {
  const confirm = useBoolean();
  const [remove] = useDeleteNoteMutation();

  const handleDeleteButtonClick = (event: React.MouseEvent) => {
    confirm.onTrue();
  };

  return (
    <>
      <IconButton onClick={handleDeleteButtonClick} sx={{ width: 55 }}>
        <DeleteIcon color='primary' />
      </IconButton>
      {confirm.value && (
        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          title={'Are you sure you want to delete this note?'}
          action={
            <Button
              variant='outlined'
              onClick={(e) => {
                e.stopPropagation();
                remove(note.id);
                confirm.onFalse();
              }}
            >
              Delete
            </Button>
          }
        />
      )}
    </>
  );
}
