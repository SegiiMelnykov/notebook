'use client';
import { useAppSelector } from '@/hooks/use-redux';
import { useGetNotesQuery } from '@/store/notes/api';
import { Box, Button, Pagination, Stack, Typography } from '@mui/material';
import { useBoolean } from '@/hooks/use-boolean';
import AddEditNoteModal from '@/sections/note/add-edit-note-title-modal';
import NoteList from '../note-list';
import NoteListTollbar from '../note-list-toolbar';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { perPageLimit } from '@/utils/consts';
import { useResponsive } from '@/hooks/use-responsive';

// sections

// ----------------------------------------------------------------------

type TProps = {
  parentId?: string;
};

export default function NoteListView({ parentId = '' }: TProps) {
  const { user } = useAppSelector((state) => state.auth);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { data, isSuccess } = useGetNotesQuery(
    {
      limit: searchParams.get('limit') ?? perPageLimit,
      page: searchParams.get('page') ?? 1,
      filter: searchParams.get('filter') ?? 'active',
      parentId: parentId,
    },
    {
      skip: !user,
    },
  );
  const add = useBoolean();
  const mdUp = useResponsive('up', 'md');
  const pageCount = data?.count
    ? Math.ceil(
        data?.count /
          (searchParams.get('limit')
            ? Number(searchParams.get('limit'))
            : perPageLimit),
      )
    : 0;

  const addPageParam = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', String(searchParams));
    return newSearchParams;
  };
  const removePageParam = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('page');
    return newSearchParams;
  };

  const handlePage = (page: number) => {
    if (page === 1) {
      router.push(pathname + '?' + removePageParam());
    } else {
      router.push(pathname + '?' + addPageParam());
    }
  };

  return (
    <Box>
      {isSuccess && (
        <>
          <NoteListTollbar isChild={!!parentId} />
          <Stack direction={'row'} justifyContent={'flex-end'} mt={3}>
            {data.notes.length > 3 && (
              <Button
                variant='contained'
                color='primary'
                onClick={add.onTrue}
                size={mdUp ? 'medium' : 'small'}
              >
                Add note
              </Button>
            )}
          </Stack>
          <NoteList list={data.notes} count={data.count} />
          <Stack direction={'row'} justifyContent={'flex-end'} mt={3}>
            <Button
              variant='contained'
              color='primary'
              onClick={add.onTrue}
              size={mdUp ? 'medium' : 'small'}
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
                searchParams.get('page') ? Number(searchParams.get('page')) : 1
              }
              onChange={(e, number) => handlePage(number)}
              variant='outlined'
              color='primary'
              shape='rounded'
              sx={{
                mt: 3,
                ul: {
                  justifyContent: 'center',
                },
              }}
            />
          ) : null}
        </>
      )}
    </Box>
  );
}
