import { EntityState, createEntityAdapter } from '@reduxjs/toolkit';
import { IMessage, Status } from '../../schema/schema';
import { RootState } from '../store';

export interface ChatState extends EntityState<IMessage> {
  status: Status;
  room?: string;
  errorMessage?: string;
  replyMessage?: IMessage;
}

export const chatAdapter = createEntityAdapter<IMessage>({
  selectId: (message) => message.id,
});

export const getChat = chatAdapter.getSelectors<RootState>(
  (state) => state.chat || chatAdapter.getInitialState()
);
