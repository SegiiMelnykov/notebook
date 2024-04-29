import { useAuthQuery } from '@/store/auth/auth.api';
import { useAuthActions } from './use-auth';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { User } from '@/types/user';
import { usePathname } from 'next/navigation';

type FunctionParams = {
  user: User | null;
};

export function useCheckAuth({ user }: FunctionParams) {
  const pathname = usePathname();
  console.log('user', user);
  const { data, isLoading, isError, isSuccess, refetch } = useAuthQuery(null, {
    skip: user ? false : true,
  });
  const { setCredentials, logOut } = useAuthActions();
  const dispatch = useDispatch();
  console.log('data', data);
  console.log('isError', isError);
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials({ ...data }));
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(logOut(null));
    }
  }, [isError]);

  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [pathname]);

  return {
    isLoading,
  };
}
