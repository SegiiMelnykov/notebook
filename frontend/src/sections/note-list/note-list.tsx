import { Box, Stack, Typography } from "@mui/material";
import NoteListItem from "./note-list-item";
import { TNote } from "src/types/notes";
import { EmptyContent } from "src/components/information";
import { useSearchParams } from "react-router-dom";
import { useResponsive } from "src/hooks/use-responsive";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import { SplashScreen } from "src/components/loading-screen";
import { useReorder } from "./hooks/useReorder";
import NoteListItemDragWrapper from "./note-list-item-drag-wrapper";

type TProps = {
  list: TNote[];
  count: number;
};

// ----------------------------------------------------------------------

export default function NoteList({ list, count }: TProps) {
  const [listState, setListState] = useState(list);
  const { reorder, isLoading } = useReorder();

  const [searchParams] = useSearchParams();
  const mdUp = useResponsive("up", "md");
  const messageArr = {
    all: "there is no notes yet, create one",
    active: "there is no notes yet, create one",
    completed: "there is no complited notes yet, make somthing",
    deleted: "there is no deleted notes",
  };
  const message =
    messageArr[
      (searchParams.get("filter") ?? "active") as keyof typeof messageArr
    ];
  useEffect(() => {
    setListState(list);
  }, [list]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    reorder(listState, result, setListState);
  };

  // console.log(
  //   "list",
  //   list.map((item) => ({ title: item.title, order: item.sortOrder })),
  // );

  return (
    <>
      {!!count && (
        <Typography
          variant="body2"
          sx={{ mb: 2, ml: mdUp ? 1 : 0 }}
          align={mdUp ? "left" : "center"}
        >
          were found {count} notes
        </Typography>
      )}
      {listState.length ? (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Stack>
            <Droppable droppableId={"list"}>
              {(provided, snapshot) => (
                <Box ref={provided.innerRef} {...provided.droppableProps}>
                  {listState.map((note, index) => (
                    <NoteListItemDragWrapper
                      key={note.id}
                      value={note}
                      index={index}
                    />
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </Stack>
        </DragDropContext>
      ) : (
        <EmptyContent title={message} mt={5} />
      )}
    </>
  );
}
