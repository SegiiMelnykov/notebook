'use client';

import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  useLoginMutation,
  useRegistrationMutation,
} from '@/store/auth/auth.api';
import { useAuthActions } from '@/hooks/use-auth';
import { paths } from '@/routes/paths';
import { useBoolean } from '@/hooks/use-boolean';
import * as Yup from 'yup';
import FormProvider, { RHFTextField } from '@/components/hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import Iconify from '@/components/iconify';
import Alert from '@mui/material/Alert';
import LoadingButton from '@mui/lab/LoadingButton';
import { useRouter } from 'next/navigation';

export type FormValuesProps = {
  email: string;
  password: string;
};

type Props = {
  isLoginPage: boolean;
};

const AuthForm = ({ isLoginPage }: Props) => {
  const navigate = useRouter();
  const [text, setText] = useState<string>('');
  const [field, setField] = useState<string>('');
  const [login, { isError: isLoginError }] = useLoginMutation();
  const [registration, { isError: isRegistrationError }] =
    useRegistrationMutation();
  const { setCredentials } = useAuthActions();
  const dispatch = useDispatch();
  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    mode: 'onBlur',
    shouldFocusError: true,
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = useCallback(
    async (data: FormValuesProps) => {
      console.log('data', data);
      try {
        isLoginPage
          ? login(data)
              .unwrap()
              .then((res) => dispatch(setCredentials({ ...res })))
              .then(() => reset())
              .then(() => navigate.push('/'))
              .catch((e) => console.log(e))
          : registration(data)
              .unwrap()
              .then((res) => dispatch(setCredentials({ ...res })))
              .then(() => reset())
              .then(() => navigate.push('/'))
              .catch((e) => console.log(e));
      } catch (error: any) {
        console.log(error);
        reset();
      }
    },
    [login, registration, reset],
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems={'center'} mt={2}>
        {isLoginError && (
          <Alert severity='error'>Wrong email or password</Alert>
        )}
        {isRegistrationError && (
          <Alert severity='error'>Something went wrong</Alert>
        )}

        <RHFTextField name='email' label='Email address' />

        <RHFTextField
          name='password'
          label='Password'
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton onClick={password.onToggle} edge='end'>
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link> */}

        <LoadingButton
          fullWidth
          color='inherit'
          size='large'
          type='submit'
          variant='contained'
          loading={isSubmitting}
        >
          {isLoginPage ? 'Login' : 'Register'}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
};

export default AuthForm;
