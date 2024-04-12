import { useAppSelector } from "src/hooks/use-redux";
import { useGetNotesQuery } from "src/store/notes/api";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import { useBoolean } from "src/hooks/use-boolean";
import AddEditNoteModal from "src/sections/note/add-edit-note-title-modal";
import NoteList from "../note-list";
import NoteListTollbar from "../note-list-toolbar";
import { useSearchParams } from "react-router-dom";
import { pageLimit } from "src/utils/consts";
import { useResponsive } from "src/hooks/use-responsive";

// sections

// ----------------------------------------------------------------------

type TProps = {
  parentId?: string;
};

export default function NoteListView({ parentId = "" }: TProps) {
  const { user } = useAppSelector((state) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isSuccess } = useGetNotesQuery(
    {
      limit: searchParams.get("limit") ?? pageLimit,
      page: searchParams.get("page") ?? 1,
      filter: searchParams.get("filter") ?? "active",
      parentId: parentId,
    },
    {
      skip: !user,
    },
  );
  const add = useBoolean();
  const mdUp = useResponsive("up", "md");
  const pageCount = data?.count
    ? Math.ceil(
        data?.count /
          (searchParams.get("limit")
            ? Number(searchParams.get("limit"))
            : pageLimit),
      )
    : 0;

  const handlePage = (page: number) => {
    if (page === 1) {
      setSearchParams((prev: any) => {
        const newSearchParams = new URLSearchParams(prev);
        newSearchParams.delete("page");
        return newSearchParams;
      });
    } else {
      setSearchParams((prev: any) => {
        const newSearchParams = new URLSearchParams(prev);
        newSearchParams.set("page", String(page));
        return newSearchParams;
      });
    }
  };

  return (
    <Box>
      {isSuccess && (
        <>
          <NoteListTollbar isChild={!!parentId} />
          <NoteList list={data.notes} count={data.count} />
          <Stack direction={"row"} justifyContent={"flex-end"} mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={add.onTrue}
              size={mdUp ? "medium" : "small"}
            >
              Add note
            </Button>
          </Stack>
          {add.value && (
            <AddEditNoteModal onclose={add.onFalse} parentId={parentId} />
          )}
          {data.count !== 0 && pageCount > 1 ? (
            <Pagination
              count={pageCount}
              page={
                searchParams.get("page") ? Number(searchParams.get("page")) : 1
              }
              onChange={(e, number) => handlePage(number)}
              variant="outlined"
              color="primary"
              shape="rounded"
              sx={{
                mt: 3,
                ul: {
                  justifyContent: "center",
                },
              }}
            />
          ) : null}
        </>
      )}
    </Box>
  );
}
