import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../schema/schema';
import { addMessage, messagesReceived } from './actions';
import { chatAdapter, ChatState } from './utils';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState<ChatState>({
    ids: [],
    entities: {},
    status: 'idle',
  }),
  reducers: {
    setReplyMessage: (state, action: PayloadAction<number>) => {
      const parentId = state.entities[action.payload]?.id;
      const parentMessage = Object.values(state.entities).find(
        (m) => m?.id === parentId
      );
      state.replyMessage = parentMessage;
    },
    removeReplyMessage: (state) => {
      state.replyMessage = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addMessage.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.payload;
      })
      .addCase(
        addMessage.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.status = 'success';
          chatAdapter.addOne(state, action.payload);
        }
      )
      .addCase(addMessage.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(messagesReceived.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(
        messagesReceived.fulfilled,
        (state, action: PayloadAction<IMessage[]>) => {
          state.status = 'success';
          chatAdapter.setAll(state, action.payload);
        }
      )
      .addCase(messagesReceived.pending, (state) => {
        state.status = 'loading';
      });
  },
});

export const { actions: chatActions } = chatSlice;

export const { reducer: chatReducer } = chatSlice;
