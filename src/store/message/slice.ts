import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LS_USERNAME_KEY } from '../../components/const';
import { IMessage } from '../../schema/schema';

const username = localStorage.getItem(LS_USERNAME_KEY) as string;

const initialState: IMessage = {
  id: 0,
  username,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessageText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setMessageImageUrl: (state, { payload }: PayloadAction<string>) => {
      const bin = payload ? 'data:image/jpeg;base64,' + btoa(payload) : '';
      state.imageUrl = bin;
    },
    resetMessageContent: (state) => {
      state.imageUrl = '';
      state.text = '';
    },
    resetMessageImage: (state) => {
      state.imageUrl = '';
    },
  },
});

export const { actions: messageActions } = messageSlice;

export const { reducer: messageReducer } = messageSlice;
