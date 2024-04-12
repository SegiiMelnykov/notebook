import { Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import HomeNotesView from "src/sections/home/view/home-notes-view";
import HomeTodoView from "src/sections/home/view/home-todo-view";

// sections

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", textTransform: "capitalize" }}
      >
        Workspace
      </Typography>
      <HomeTodoView />
      <HomeNotesView />
    </>
  );
}
