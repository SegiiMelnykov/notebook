import { IconButton } from "@mui/material";
import { TNote } from "src/types/notes";

import { useCompliteNoteMutation } from "src/store/notes/api";

import DoneAllIcon from "@mui/icons-material/DoneAll";

// sections

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function CompliteNoteAction({ note }: TProps) {
  const [complete] = useCompliteNoteMutation();

  const handleCompleteButtonClick = (event: React.MouseEvent) => {
    complete(note.id);
  };

  return (
    <>
      <IconButton onClick={handleCompleteButtonClick} sx={{ width: 55 }}>
        <DoneAllIcon color={note.completed ? "primary" : "inherit"} />
      </IconButton>
    </>
  );
}
