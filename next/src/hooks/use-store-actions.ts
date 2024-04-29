import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { noteActions } from '@/store/notes/note.slice';

const actions = {
  ...noteActions,
};

export const useStoreActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
