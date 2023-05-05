import { RootState } from '../store';

export const getReplyMessage = (state: RootState) => state.chat?.replyMessage;
