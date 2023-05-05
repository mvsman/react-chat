import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../schema/schema';

const initialState: IMessage = {
  id: 0,
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessageId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
    setMessageParendId: (state, action: PayloadAction<number>) => {
      state.parentId = action.payload;
    },
    setMessageUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setMessageText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setMessageTime: (state, action: PayloadAction<string>) => {
      state.time = action.payload;
    },
    setMessageImageUrl: (state, { payload }: PayloadAction<string>) => {
      const bin = payload ? 'data:image/jpeg;base64,' + btoa(payload) : '';
      state.imageUrl = bin;
    },
    resetMessageContent: (state) => {
      state.imageUrl = '';
      state.text = '';
    },
  },
});

export const { actions: messageActions } = messageSlice;

export const { reducer: messageReducer } = messageSlice;
