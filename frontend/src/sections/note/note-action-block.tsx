import { Stack } from "@mui/material";
import { TNote } from "src/types/notes";

import CompliteNoteAction from "../share/complite-note";
import AddTodoAction from "../share/add-note-todo";
import DeleteNoteAction from "../share/delete-note";
import HideNoteAction from "../share/hide-note-";
import MoveNoteAction from "../share/move-note";

// sections

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function NoteActionBlock({ note }: TProps) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {!note.deletedAt && (
        <Stack direction={"row"} justifyContent={"flex-end"} flexWrap={"wrap"}>
          <HideNoteAction note={note} />
          <MoveNoteAction note={note} />
          <CompliteNoteAction note={note} />
          <AddTodoAction note={note} />
          <DeleteNoteAction note={note} />
        </Stack>
      )}
    </div>
  );
}