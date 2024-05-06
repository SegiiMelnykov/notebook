import { Card, Link as MUILink, Stack } from '@mui/material';
import { TNote } from '@/types/notes';

import { useGetBreadcrambsNoteQuery } from '@/store/notes/api';
import { paths } from '@/routes/paths';
import Link from 'next/link';

// sections

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function NoteBreadcrumbs({ note }: TProps) {
  const { data: breadcrumbs } = useGetBreadcrambsNoteQuery(note.id);

  return (
    <Card sx={{ my: 3, p: 2 }}>
      <Stack direction={'row'} spacing={0.5} flexWrap={'wrap'}>
        <MUILink
          component={Link}
          href={paths.notes}
          sx={{
            textDecoration: 'none',
            '&::after': { content: '"/"', ml: 0.5 },
          }}
        >
          My notes
        </MUILink>
        {breadcrumbs?.map((breadcrumb) => {
          if (breadcrumb.id === note.id) {
            return (
              <span key={breadcrumb.id}>
                {' '}
                {breadcrumb.title.length > 10
                  ? breadcrumb.title.slice(0, 15).trim() + '...'
                  : breadcrumb.title}
              </span>
            );
          }
          return (
            <MUILink
              component={Link}
              key={breadcrumb.id}
              href={paths.note(breadcrumb.id)}
              sx={{
                textDecoration: 'none',
                '&::after': { content: '"/"', ml: 0.5 },
              }}
            >
              {breadcrumb.title.length > 10
                ? breadcrumb.title.slice(0, 15).trim() + '...'
                : breadcrumb.title}
            </MUILink>
          );
        })}
      </Stack>
    </Card>
  );
}
