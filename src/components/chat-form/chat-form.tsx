import { ChangeEvent, FormEvent, KeyboardEvent } from 'react';
import { chatActions, addMessage } from '../../store/chat';
import { messageActions } from '../../store/message';
import { useAppDispatch } from '../../store/store';
import { convertImageToBinary } from './utils';

import { ChatFormView } from './chat-form-view';

export const ChatForm = () => {
  const dispatch = useAppDispatch();

  const handleRemoveReplyMessage = () => {
    dispatch(chatActions.removeReplyMessage());
  };

  const handleChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(messageActions.setMessageText(e.target.value));
  };

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const [image] = e.target.files;
      const bin = await convertImageToBinary(image);
      dispatch(messageActions.setMessageImageUrl(bin));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addMessage());
  };

  const handleSubmitByEnter = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.code === 'Enter') {
      dispatch(addMessage());
    }
  };

  return (
    <ChatFormView
      onRemoveReplyMessage={handleRemoveReplyMessage}
      onChangeText={handleChangeText}
      onChangeFile={handleChangeFile}
      onSubmit={handleSubmit}
      onSubmitByEnter={handleSubmitByEnter}
    />
  );
};
