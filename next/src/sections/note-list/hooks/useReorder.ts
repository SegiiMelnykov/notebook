import { Dispatch, SetStateAction } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { useSearchParams } from 'next/navigation';
import { useReorderListMutation } from '@/store/notes/api';
import { TNote } from '@/types/notes';
import { pageLimit } from '@/utils/consts';

export const useReorder = () => {
  const [reorderList, { isLoading }] = useReorderListMutation();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? 1;
  const limit = searchParams.get('limit') ?? pageLimit;
  const reorder = (
    list: TNote[],
    result: DropResult,
    setList: Dispatch<SetStateAction<TNote[]>>,
  ) => {
    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination!.index, 0, reorderedItem);
    setList([...items]);

    reorderList([
      ...items.map((item, index) => ({
        id: item.id,
        sortOrder: (+page - 1) * +limit + (index + 1),
      })),
    ])
      .then()
      .catch((e) => {
        console.log(e);
        setList([...list]);
      });
  };

  return { reorder, isLoading };
};
