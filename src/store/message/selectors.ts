import { RootState } from '../store';

export const getMessage = (state: RootState) => state.message;

export const getMessageId = (state: RootState) => state.message.id;

export const getMessageUsername = (state: RootState) => state.message.username;

export const getMessageParendId = (state: RootState) => state.message.parentId;

export const getMessageText = (state: RootState) => state.message.text;

export const getMessageTime = (state: RootState) => state.message.time;

export const getMessageImageUrl = (state: RootState) => state.message.imageUrl;
