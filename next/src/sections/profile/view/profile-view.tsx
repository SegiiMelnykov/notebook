'use client';
import { Card, Divider, MenuItem, Stack, Typography } from '@mui/material';

import FormProvider, { RHFSelect, RHFTextField } from '@/components/hook-form';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { useResponsive } from '@/hooks/use-responsive';
import { Profile, ProfileForm } from '@/types/profile';
import { useUpdateProfileMutation } from '@/store/profile/api';
import { notesPerPageOptions } from '@/utils/consts';

// sections

// ----------------------------------------------------------------------

type Props = {
  profile: Profile;
};

export default function ProfileView({ profile }: Props) {
  const [update, { isLoading }] = useUpdateProfileMutation();
  const mdUp = useResponsive('up', 'md');

  const Schema = Yup.object().shape({
    email: Yup.string().email().required(),
    notesPerPage: Yup.number().required(),
  });

  const methods = useForm<ProfileForm>({
    resolver: yupResolver(Schema),
    defaultValues: { ...profile },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  console.log('errors', errors);

  useEffect(() => {
    reset(profile);
  }, [profile]);

  const onSubmit = async (data: ProfileForm) => {
    console.log(data);
    try {
      await update({ id: profile.id, profile: data });
    } catch (error: any) {
      console.log(error);
    }
  };

  const formComponent = (
    <FormProvider methods={methods}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          spacing={{ xs: 1, sm: 2 }}
        >
          <RHFTextField name='email' label='Email' />
          <RHFSelect name='notesPerPage' label='Notes Per Page'>
            {notesPerPageOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </RHFSelect>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>
      <Stack direction='row' justifyContent={'flex-end'} my={2} spacing={2}>
        <LoadingButton
          type='button'
          onClick={() => {
            console.log('onClick');
            handleSubmit(onSubmit)();
          }}
          loading={isLoading}
          variant='contained'
          color='primary'
        >
          Save
        </LoadingButton>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {!mdUp ? (
        formComponent
      ) : (
        <Card sx={{ my: 3, p: 2 }}>{formComponent}</Card>
      )}
    </>
  );
}
