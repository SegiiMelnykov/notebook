import { TNote } from '@/types/notes';
import HomeList from './list';

import { paths } from '@/routes/paths';
import { Stack, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';

type Props = {
  item: TNote & {
    children?: TNote[];
  };
};

export default function HomeListItem({ item }: Props) {
  const [expanded, setExpanded] = useState(!item.homeHidden);
  console.log(item.children);
  const theme = useTheme();
  const title =
    item.title.slice(0, 1).toUpperCase() +
    item.title.slice(1, item.title.length);
  return (
    <>
      <li
        style={{
          color: theme.palette.primary.main,
          marginBottom: '3px',
        }}
      >
        <Stack direction={'row'} spacing={1} alignItems={'center'}>
          {!item.children?.length ? (
            <RemoveIcon fontSize='small' sx={{ ml: '3px' }} />
          ) : expanded ? (
            <IndeterminateCheckBoxOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => setExpanded((prev) => !prev)}
            />
          ) : (
            <AddBoxOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => setExpanded((prev) => !prev)}
            />
          )}
          <Link style={{ textDecoration: 'none' }} href={paths.note(item.id)}>
            <Typography
              color={'primary'}
              variant='h6'
              sx={{ display: 'inline' }}
            >
              {title}
            </Typography>
          </Link>
        </Stack>

        {!!item.children?.length && expanded && (
          <HomeList list={item.children} />
        )}
      </li>
    </>
  );
}
