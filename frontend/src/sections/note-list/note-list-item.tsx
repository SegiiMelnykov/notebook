import { Box, Card, Stack, Typography } from "@mui/material";
import { TNote } from "src/types/notes";
import Label from "src/components/label/label";
import { useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import NoteActionBlock from "../note/note-action-block";

// sections

// ----------------------------------------------------------------------

type Props = {
  value: TNote;
  isDraggable?: boolean;
};

const NoteListItem = ({ value, isDraggable = true }: Props) => {
  const navigeate = useNavigate();

  const handleCardClick = () => {
    navigeate(paths.note(value.id));
  };

  return (
    <Card
      sx={{
        mt: 2,
        py: { xs: 1, sm: 2 },
        px: { xs: 0.5, sm: 2 },
        cursor: "pointer",
      }}
      onClick={handleCardClick}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        gap={2}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={2}>
          {isDraggable && <DragIndicatorIcon />}
          <Box>
            <Typography variant="h6">{value.title}</Typography>
            <Typography variant="caption">
              <Label color={"primary"}>
                {new Date(value.createdAt).toLocaleDateString()}
              </Label>
            </Typography>
            {!!value.deletedAt && <Label color={"error"}>deleted</Label>}
          </Box>
        </Stack>

        <Stack direction={"row"} justifyContent={"flex-end"} flexWrap={"wrap"}>
          <NoteActionBlock note={value} />
        </Stack>
      </Stack>
    </Card>
  );
};

export default NoteListItem;