//--Types

import { TNote } from "src/types/notes";
import AddEditNoteForm from "./add-edit-note-title-form";

type Props = {
  onclose: () => void;
  value?: null | TNote;
  parentId?: string;
};

export default function AddEditNoteModal({
  onclose,
  value = null,
  parentId,
}: Props) {
  return (
    <AddEditNoteForm
      onclose={onclose}
      parentId={parentId ?? ""}
      value={value}
    />
  );
}
