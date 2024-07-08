import { Link as MUILink } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AuthForm from '../auth-form';
// routes
import { paths } from '@/routes/paths';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function RegisterView() {
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 2, position: 'relative' }}>
      <Typography variant='h4'>Get started absolutely free</Typography>

      <Stack direction='row' spacing={0.5} justifyContent={'center'}>
        <Typography variant='body2'> Already have an account? </Typography>

        <MUILink href={paths.auth.login} component={Link} variant='subtitle2'>
          Sign in
        </MUILink>
      </Stack>
    </Stack>
  );

  const renderTerms = (
    <Typography
      component='div'
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <MUILink underline='always' color='text.primary'>
        Terms of Service
      </MUILink>
      {' and '}
      <MUILink underline='always' color='text.primary'>
        Privacy Policy
      </MUILink>
      .
    </Typography>
  );

  return (
    <>
      <Stack alignItems={'center'}>
        {renderHead}
        <AuthForm isLoginPage={false} />
        {renderTerms}
      </Stack>
    </>
  );
}
