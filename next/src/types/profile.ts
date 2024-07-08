export type Profile = {
  id: number;
  email: string;
  notesPerPage: number;
};

export type ProfileForm = Omit<Profile, 'id'>;
