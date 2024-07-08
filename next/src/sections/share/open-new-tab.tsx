'use client';

import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import { TNote } from '@/types/notes';

import { useHideNoteMutation } from '@/store/notes/api';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { paths } from '@/routes/paths';

// sections

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function OpenInNewTab({ note }: TProps) {
  const openInNewTab = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  return (
    <>
      <IconButton
        title={note.homeHidden ? 'Show' : 'Hide'}
        sx={{ width: 55 }}
        onClick={() => openInNewTab(paths.note(note.id))}
      >
        <OpenInNewIcon />
      </IconButton>
    </>
  );
}
