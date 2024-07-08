'use client';
import { TNote } from '@/types/notes';
import { paths } from '@/routes/paths';

import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

import NoteListItem from './note-list-item';

// sections

// ----------------------------------------------------------------------

type Props = {
  value: TNote;
  index: number;
};

const NoteListItemDragWrapper = React.forwardRef(
  ({ value, index }: Props, ref) => {
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
