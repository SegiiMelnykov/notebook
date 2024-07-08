import { IconButton } from '@mui/material';
import { TNote } from '@/types/notes';

import { useBoolean } from '@/hooks/use-boolean';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import MoveNote from './move-note-modal';

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function MoveNoteAction({ note }: TProps) {
  const move = useBoolean();

  const handleMoveNote = (event: React.MouseEvent) => {
    move.onTrue();
  };

  return (
    <>
      <IconButton title={'move'} sx={{ width: 55 }} onClick={handleMoveNote}>
        <ArrowOutwardIcon />
      </IconButton>
      {move.value && <MoveNote onclose={move.onFalse} noteId={note.id} />}
    </>
  );
}
