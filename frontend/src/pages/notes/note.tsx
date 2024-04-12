import { Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useAppSelector } from "src/hooks/use-redux";
import NoteView from "src/sections/note/view/note-view";
import { useGetOneNoteQuery } from "src/store/notes/api";
// sections

// ----------------------------------------------------------------------

export default function NotePage() {
  const { user } = useAppSelector((state) => state.auth);
  let { id } = useParams();
  const { data: note, isSuccess } = useGetOneNoteQuery(id!.toString(), {
    skip: !user || !id,
  });
  return (
    <>
      <Helmet>
        <title> Notebook | {note ? note.title : "Note"} </title>
      </Helmet>
      {isSuccess && <NoteView note={note} />}
    </>
  );
}
