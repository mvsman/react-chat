import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { chatReducer } from './chat';
import { messageReducer } from './message';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    message: messageReducer,
  },
});

export type AsyncThunkConfig = {
  state: RootState;
  rejectValue: string;
};
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
