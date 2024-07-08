'use client';
// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { paths } from '@/routes/paths';
import { useAppSelector } from '@/hooks/use-redux';
import { useAuthActions } from '@/hooks/use-auth';

import { useRouter } from 'next/navigation';
import { useResponsive } from '@/hooks/use-responsive';
// auth

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  const { user } = useAppSelector((state) => state.auth);
  const { logOut } = useAuthActions();
  const mdUp = useResponsive('up', 'md');
  const router = useRouter();
  const handleLogout = () => {
    logOut(null);
    router.push('/');
  };
  const handleClick = () => {
    user ? handleLogout() : router.push(paths.auth.login);
  };
  return (
    <>
      {user ? (
        <Button
          onClick={handleClick}
          variant='outlined'
          sx={{ mr: 1, ...sx }}
          size={mdUp ? 'medium' : 'small'}
        >
          Log out
        </Button>
      ) : (
        <Button
          onClick={handleClick}
          variant='outlined'
          sx={{ mr: 1, ...sx }}
          size={mdUp ? 'medium' : 'small'}
        >
          Log in
        </Button>
      )}
    </>
  );
}
