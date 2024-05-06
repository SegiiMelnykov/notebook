import { TNote } from '@/types/notes';
import HomeList from './list';

import { paths } from '@/routes/paths';
import { Typography, useTheme } from '@mui/material';
import Link from 'next/link';

type Props = {
  item: TNote & {
    children?: TNote[];
  };
};

export default function HomeListItem({ item }: Props) {
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
        <Link style={{ textDecoration: 'none' }} href={paths.note(item.id)}>
          <Typography color={'primary'} variant='h6'>
            {title}
          </Typography>
        </Link>
        {!!item.children?.length && <HomeList list={item.children} />}
      </li>
    </>
  );
}
