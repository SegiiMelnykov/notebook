import { Box, Typography } from "@mui/material";
import { TTodo } from "src/types/todo";
import HomeTodoDayListItem from "./todo-day-list-item";

type Props = { list: TTodo };

export default function HomeTodoDayList({ list }: Props) {
  console.log(list);
  const today = new Date();
  const currentListDay = new Date(list.date);
  const day =
    today.getDate() === currentListDay.getDate() ? "tomorrow" : "today";
  return (
    <Box mt={2}>
      <Typography align="center">{day}</Typography>
      {list?.todos.map((note, index) => (
        <HomeTodoDayListItem note={note} key={note.id} />
      ))}
    </Box>
  );
}
