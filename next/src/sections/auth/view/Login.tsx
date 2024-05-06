import { Link as MUILink } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AuthForm from '../auth-form';
// routes
import { paths } from '@/routes/paths';
import Link from 'next/link';

// config

// ----------------------------------------------------------------------

export default function LoginView() {
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5 }} alignItems={'center'}>
        <Typography variant='h4'>Sign in to Notes</Typography>

        <Stack direction='row' spacing={0.5}>
          <Typography variant='body2'>New user?</Typography>

          <MUILink
            component={Link}
            href={paths.auth.register}
            variant='subtitle2'
          >
            Create an account
          </MUILink>
        </Stack>
        <AuthForm isLoginPage />
      </Stack>
    </>
  );
}
