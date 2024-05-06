import { IconButton } from '@mui/material';
import { TNote } from '@/types/notes';
import { useBoolean } from '@/hooks/use-boolean';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import AddEditTodoDate from './add-note-todo-modal';

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function AddTodoAction({ note }: TProps) {
  const todo = useBoolean();

  const handleOpenTodoModal = (event: React.MouseEvent) => {
    todo.onTrue();
  };

  return (
    <>
      <IconButton sx={{ width: 55 }} onClick={handleOpenTodoModal}>
        <PlaylistAddIcon />
      </IconButton>

      {todo.value && <AddEditTodoDate onclose={todo.onFalse} id={note.id} />}
    </>
  );
}
