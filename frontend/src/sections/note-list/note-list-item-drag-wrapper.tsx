import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useBoolean } from "src/hooks/use-boolean";
import { TNote } from "src/types/notes";
import { ConfirmDialog } from "src/components/custom-dialog";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  useCompliteNoteMutation,
  useDeleteNoteMutation,
} from "src/store/notes/api";
import Label from "src/components/label/label";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "src/routes/paths";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import NoteActionBlock from "../note/note-action-block";
import NoteListItem from "./note-list-item";

// sections

// ----------------------------------------------------------------------

type Props = {
  value: TNote;
  index: number;
};

const NoteListItemDragWrapper = React.forwardRef(
  ({ value, index }: Props, ref) => {
    const navigeate = useNavigate();

    const handleCardClick = () => {
      navigeate(paths.note(value.id));
    };

    return (
      <Draggable key={value.id} draggableId={value.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <NoteListItem value={value} />
          </div>
        )}
      </Draggable>
    );
  },
);

export default NoteListItemDragWrapper;
