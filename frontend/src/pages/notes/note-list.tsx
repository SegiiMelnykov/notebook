import { Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { LoadingScreen } from "src/components/loading-screen";
import { useAppSelector } from "src/hooks/use-redux";
import NoteListView from "src/sections/note-list/view/note-list-view";
import { useGetNotesQuery } from "src/store/notes/api";
// sections

// ----------------------------------------------------------------------

export default function NoteListPage() {
  return (
    <>
      <Helmet>
        <title>My notes</title>
      </Helmet>
      <Typography variant="h3" textAlign={"center"}>
        My notes
      </Typography>
      <NoteListView />
    </>
  );
}
