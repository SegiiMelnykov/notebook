// import { RootState } from 'src/store';
import { RootState } from '@/store';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
