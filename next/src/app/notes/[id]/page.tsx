'use client';
import { useAppSelector } from '@/hooks/use-redux';
import NoteView from '@/sections/note/view/note-view';
import { useGetOneNoteQuery } from '@/store/notes/api';
// sections

// ----------------------------------------------------------------------

export default function NotePage({ params }: { params: { id: string } }) {
  const { user } = useAppSelector((state) => state.auth);
  const { data: note, isSuccess } = useGetOneNoteQuery(params.id!.toString(), {
    skip: !user || !params.id,
  });
  return <>{isSuccess && <NoteView note={note} />}</>;
}
