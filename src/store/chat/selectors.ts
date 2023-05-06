import { RootState } from '../store';

export const getReplyMessage = (state: RootState) => state.chat?.replyMessage;

export const getChatRoom = (state: RootState) => state.chat.room;
