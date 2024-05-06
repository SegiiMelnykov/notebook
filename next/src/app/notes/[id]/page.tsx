'use client';
import { useAppSelector } from '@/hooks/use-redux';
import NoteView from '@/sections/note/view/note-view';
import { useGetOneNoteQuery } from '@/store/notes/api';
import { useRouter } from 'next/navigation';
// sections

// ----------------------------------------------------------------------

export default function NotePage({ params }: { params: { id: string } }) {
  const { user } = useAppSelector((state) => state.auth);
  let {} = useRouter();
  const { data: note, isSuccess } = useGetOneNoteQuery(params.id!.toString(), {
    skip: !user || !params.id,
  });
  return <>{isSuccess && <NoteView note={note} />}</>;
}
