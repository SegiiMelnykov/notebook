export type TNote = {
  id: string;
  parentId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  userId: number;
  completed: boolean;
  sortOrder: number;
  homeHidden: boolean;
};

export type TFilter = "all" | "active" | "completed" | "deleted";

export type TNoteExtendedForm = {
  id: string;
  title: string;
  content?: string | null;
};

export type TReorderItem = {
  id: string;
  sortOrder: number;
};
