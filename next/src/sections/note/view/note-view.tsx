'use client';
import { Card, Divider, Stack, Typography } from '@mui/material';
import { TNote, TNoteExtendedForm } from '@/types/notes';

import FormProvider, { RHFTextField } from '@/components/hook-form';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import RHFEditor from '@/components/hook-form/rhf-editor';
import NoteListView from '@/sections/note-list/view/note-list-view';
import { LoadingButton } from '@mui/lab';
import NoteBreadcrumbs from '../note-breadcrumbs';
import { useEditNoteMutation } from '@/store/notes/api';
import { useResponsive } from '@/hooks/use-responsive';
import NoteActionBlock from '../note-action-block';
import { useRouter } from 'next/navigation';
import { paths } from '@/routes/paths';

// sections

// ----------------------------------------------------------------------

type TProps = {
  note: TNote;
};
export default function NoteView({ note }: TProps) {
  const [update, { isLoading }] = useEditNoteMutation();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');

  const Schema = Yup.object().shape({
    title: Yup.string().required('Name is required'),
    content: Yup.string().nullable(),
    id: Yup.string().required('id is required'),
  });

  const methods = useForm<TNoteExtendedForm>({
    resolver: yupResolver(Schema),
    defaultValues: { ...note },
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    reset(note);
  }, [note]);

  const saveAndBack = async (data: TNoteExtendedForm) => {
    try {
      await update(data).then(() => router.push(paths.note(note.parentId)));
    } catch (error: any) {
      console.log(error);
    }
  };

  const onSubmit = useCallback(async (data: TNoteExtendedForm) => {
    try {
      await update(data);
    } catch (error: any) {
      console.log(error);
    }
  }, []);

  const formComponent = (
    <FormProvider methods={methods}>
      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column-reverse', sm: 'row' }}
          spacing={{ xs: 1, sm: 2 }}
        >
          <RHFTextField name='title' label='Title' />
          <Stack
            direction={'row'}
            justifyContent={'flex-end'}
            mb={{ xs: 0, sm: 0 }}
          >
            <NoteActionBlock note={note} />
          </Stack>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack spacing={2}>
          <Typography variant='h6' pl={1}>
            Child Notes
          </Typography>
          <NoteListView parentId={note.id} />
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <RHFEditor name='content' />
      </Stack>
      <Stack direction='row' justifyContent={'flex-end'} my={2} spacing={2}>
        <LoadingButton
          type='button'
          onClick={handleSubmit(saveAndBack)}
          loading={isLoading}
          variant='contained'
          color='primary'
        >
          Save and back
        </LoadingButton>
        <LoadingButton
          type='button'
          onClick={handleSubmit(onSubmit)}
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
      <NoteBreadcrumbs note={note} />
      {!mdUp ? (
        formComponent
      ) : (
        <Card sx={{ my: 3, p: 2 }}>{formComponent}</Card>
      )}
    </>
  );
}
