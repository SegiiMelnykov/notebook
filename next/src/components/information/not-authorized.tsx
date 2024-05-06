import { Stack, Typography } from '@mui/material';

import { paths } from '@/routes/paths';
import Link from 'next/link';

export default function NotAuthorized() {
  return (
    <>
      <Stack mb={2}>
        <Typography variant='h6'>
          <Link href={paths.auth.login} color='primary'>
            Sign in
          </Link>{' '}
          or{' '}
          <Link href={paths.auth.register} color='primary'>
            sign up
          </Link>{' '}
          to manage the list of dictionaries
        </Typography>
      </Stack>
    </>
  );
}
