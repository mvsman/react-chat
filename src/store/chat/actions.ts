import { createAsyncThunk } from '@reduxjs/toolkit';

import { roomDB } from '../../db/db';
import { IMessage } from '../../schema/schema';
import { messageActions } from '../message';
import { AsyncThunkConfig } from '../store';
import { chatActions } from './slice';

export const addMessage = createAsyncThunk<IMessage, void, AsyncThunkConfig>(
  'chat/addMessage',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const messageCount = await roomDB.messages.count();
    const parentId = getState().chat.replyMessage?.id;
    const { username, text, imageUrl } = getState().message;

    const message = {
      id: messageCount + 1,
      parentId,
      username,
      text,
      time: new Date().toLocaleString(),
      imageUrl,
    };

    if (!message) {
      return rejectWithValue('Не удалось отправить сообщение');
    }

    await roomDB.messages.add(message);

    dispatch(messageActions.resetMessageContent());

    if (parentId) {
      dispatch(chatActions.removeReplyMessage());
    }

    return message;
  }
);
