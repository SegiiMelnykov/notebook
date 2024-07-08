export type TNote = {
  id: string;
  parentId: string;
  title: string;
  content: string;
  notesPerPage?: number;
  createdAt: string;
  updatedAt: string;
  completed: boolean;
  deletedAt: string;
  userId: number;
  sortOrder: number;
  homeHidden: boolean;
};

export type TNoteCreate = Omit<
  TNote,
  'id' | 'createdAt' | 'updatedAt' | 'userId' | 'deletedAt'
>;

export type TReorderItem = {
  id: string;
  sortOrder: number;
};

export type TTodo = {
  id: string;
  noteId: string;
  completionDate: string;
  createdAt: string;
  userId: number;
  updatedAt: string;
};
