import { Note } from "../models/note";

export async function getBreadcrumbs(noteId: string) {
  const breadcrumbs = [];

  // Fetch the note by its ID
  const note = await Note.findByPk(noteId);

  if (!note) {
    return breadcrumbs;
  }

  breadcrumbs.push({ id: note.id, title: note.title });

  // If the note has a parent, recursively fetch its breadcrumbs
  if (note.parentId) {
    const parentBreadcrumbs = await getBreadcrumbs(note.parentId);
    breadcrumbs.push(...parentBreadcrumbs);
  }

  return breadcrumbs;
}
