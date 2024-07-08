import { Checkbox, FormControlLabel, FormGroup, Stack } from '@mui/material';
import * as Yup from 'yup';
import { CustomDialog } from '@/components/custom-dialog';
import FormProvider, { RHFTextField } from '@/components/hook-form';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { TNote } from '@/types/notes';
import { useAddNoteMutation, useEditNoteMutation } from '@/store/notes/api';

import { paths } from '@/routes/paths';
import { useRouter } from 'next/navigation';

//--TYpes
export type TNoteForm = Omit<
  TNote,
  | 'id'
  | 'userId'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'parentId'
  | 'content'
  | 'completed'
  | 'sortOrder'
  | 'homeHidden'
> & {
  parentId?: string | undefined;
};

type Props = {
  onclose: () => void;
  value?: null | TNote;
  parentId: string;
};

export default function AddEditNoteForm({
  onclose,
  value = null,
  parentId = '',
}: Props) {
  const [add] = useAddNoteMutation();
  const [edit] = useEditNoteMutation();
  const [newWindow, setNewWindow] = useState(false);

  const navigate = useRouter();

  const Schema = Yup.object().shape({
    parentId: Yup.string(),
    title: Yup.string().required('Title is required'),
  });

  const defaultValues: TNoteForm = {
    parentId: value ? value.parentId : parentId,
    title: '',
  };

  useEffect(() => {
    if (value) {
      reset({ ...value, parentId });
    }
  }, [parentId, value]);

  const methods = useForm<TNoteForm>({
    resolver: yupResolver(Schema),
    defaultValues,
  });
  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleClose = (id: string) => {
    if (newWindow) {
      navigate.push(paths.note(id));
    }
    onclose();
  };

  const onSubmit = useCallback(
    async (data: TNoteForm) => {
      try {
        value
          ? await edit(data as TNote)
              .unwrap()
              .then((res) => handleClose(res))
          : await add(data)
              .unwrap()
              .then((res) => handleClose(res));
      } catch (error: any) {
        console.error(error);
      }
    },
    [newWindow],
  );

  return (
    <>
      <CustomDialog
        onClose={onclose}
        open={true}
        title={'Add note'}
        action={
          <LoadingButton
            type='button'
            onClick={handleSubmit(onSubmit)}
            variant='contained'
            loading={isSubmitting}
          >
            {value ? 'Edit' : 'Save'}
          </LoadingButton>
        }
      >
        <Stack spacing={2} pt={1}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <RHFTextField name='title' label='Name' />
          </FormProvider>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newWindow}
                  onChange={() => setNewWindow((prev) => !prev)}
                />
              }
              label='Open the new note in new window'
            />
          </FormGroup>
        </Stack>
      </CustomDialog>
    </>
  );
}
