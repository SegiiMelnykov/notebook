import { Box, Stack, Typography } from '@mui/material';
import NoteListItem from './note-list-item';
import { TNote } from '@/types/notes';
import { EmptyContent } from '@/components/information';

import { useResponsive } from '@/hooks/use-responsive';
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { useReorder } from './hooks/useReorder';
import NoteListItemDragWrapper from './note-list-item-drag-wrapper';
import { useSearchParams } from 'next/navigation';

type TProps = {
  list: TNote[];
  count: number;
};

// ----------------------------------------------------------------------

export default function NoteList({ list, count }: TProps) {
  const [listState, setListState] = useState(list);
  const { reorder, isLoading } = useReorder();

  const searchParams = useSearchParams();
  const mdUp = useResponsive('up', 'md');
  const messageArr = {
    all: 'there is no notes yet, create one',
    active: 'there is no notes yet, create one',
    completed: 'there is no complited notes yet, make somthing',
    deleted: 'there is no deleted notes',
  };
  const message =
    messageArr[
      (searchParams.get('filter') ?? 'active') as keyof typeof messageArr
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

  return (
    <>
      {!!count && (
        <Typography
          variant='body2'
          sx={{ mb: 2, ml: mdUp ? 1 : 0 }}
          align={mdUp ? 'left' : 'center'}
        >
          were found {count} notes
        </Typography>
      )}
      {listState.length ? (
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          <Stack>
            <Droppable droppableId={'list'}>
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
