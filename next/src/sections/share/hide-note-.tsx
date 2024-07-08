import { IconButton } from '@mui/material';
import { TNote } from '@/types/notes';

import { useHideNoteMutation } from '@/store/notes/api';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

// sections

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function HideNoteAction({ note }: TProps) {
  const [hide] = useHideNoteMutation();

  const handleHide = (event: React.MouseEvent) => {
    hide(note.id);
  };

  return (
    <>
      <IconButton
        title={note.homeHidden ? 'Show' : 'Hide'}
        sx={{ width: 55 }}
        onClick={handleHide}
      >
        {note.homeHidden ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </IconButton>
    </>
  );
}
