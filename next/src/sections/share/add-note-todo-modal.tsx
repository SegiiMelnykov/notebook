import { CustomDialog } from '@/components/custom-dialog';

import { LoadingButton } from '@mui/lab';
import { useAddToTodoMutation } from '@/store/notes/api';
import { Button, Stack, Typography } from '@mui/material';
import { useState } from 'react';

type Props = {
  onclose: () => void;
  value?: Date | null;
  id: string;
};

export default function AddEditTodoDate({ onclose, value = null, id }: Props) {
  const [addToTodo, { isLoading }] = useAddToTodoMutation();
  const [date, setDate] = useState<Date | null>(null);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  console.log('today', today);
  console.log('tomorrow', tomorrow);

  const handleChange = (e: React.MouseEvent, item: Date) => {
    if (date?.getDate() === item.getDate()) {
      setDate(null);
    } else {
      setDate(item);
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    addToTodo({
      id: id,
      date: date,
    }).then(() => {
      onclose();
    });
  };

  return (
    <>
      <CustomDialog
        onClose={onclose}
        open={true}
        title={'Add to todo list'}
        action={
          <LoadingButton
            type='button'
            onClick={handleAdd}
            // disabled={date?.getDate() === value?.getDate()}
            variant='contained'
            loading={isLoading}
          >
            {value ? 'Update' : 'Add'}
          </LoadingButton>
        }
      >
        <Typography variant='body1'>Choise date</Typography>
        <Stack
          direction={'row'}
          gap={2}
          justifyContent={'center'}
          mt={2}
          pb={1}
        >
          <Button
            variant={
              date?.getDate() === today.getDate() ? 'contained' : 'outlined'
            }
            color={date === today ? 'success' : 'primary'}
            onClick={(e) => {
              handleChange(e, today);
            }}
          >
            Today
          </Button>
          <Button
            variant={
              date?.getDate() === tomorrow.getDate() ? 'contained' : 'outlined'
            }
            onClick={(e) => {
              handleChange(e, tomorrow);
            }}
            color={'primary'}
          >
            Tomorrow
          </Button>
        </Stack>
      </CustomDialog>
    </>
  );
}
