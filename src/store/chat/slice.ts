import {
  createEntityAdapter,
  createSlice,
  EntityState,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IMessage } from '../../schema/schema';
import { addMessage } from './actions';

interface ChatState extends EntityState<IMessage> {
  status: 'idle' | 'loading' | 'error' | 'success';
  errorMessage?: string;
  replyMessage?: IMessage;
}

const chatAdapter = createEntityAdapter<IMessage>({
  selectId: (message) => message.id,
});

export const getChat = chatAdapter.getSelectors<RootState>(
  (state) => state.chat || chatAdapter.getInitialState()
);

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatAdapter.getInitialState<ChatState>({
    ids: [],
    entities: {},
    status: 'idle',
  }),
  reducers: {
    messagesReceived: (state, action: PayloadAction<IMessage[]>) => {
      chatAdapter.setAll(state, action.payload);
    },
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
      });
  },
});

export const { actions: chatActions } = chatSlice;

export const { reducer: chatReducer } = chatSlice;
