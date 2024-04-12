import { useAppSelector } from "src/hooks/use-redux";
import { useGetTodosQuery } from "src/store/notes/api";
import HomeList from "../list";
import HomeTodoList from "../todo-day-list";
import { Box, Typography } from "@mui/material";

export default function HomeTodoView() {
  const { user } = useAppSelector((state) => state.auth);
  const currentDate = new Date();

  const { data: todos, isSuccess } = useGetTodosQuery(
    { date: currentDate.toLocaleDateString() },
    {
      skip: !user,
    },
  );
  // console.log("todos", todos);

  if (isSuccess && todos.length > 0)
    return (
      <Box mb={3}>
        <Typography variant="h3">Todo list</Typography>
        {todos.map((todo) => (
          <HomeTodoList list={todo} key={todo.date} />
        ))}
      </Box>
    );
  return null;
}
