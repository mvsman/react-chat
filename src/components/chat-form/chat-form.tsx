import { ChangeEvent, FormEvent, useCallback, memo } from 'react';
import { getReplyMessage, chatActions, addMessage } from '../../store/chat';
import { getMessageText, messageActions } from '../../store/message';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { convertImageToBinary } from './utils';

import { ChatFormView } from './chat-form-view';

export const ChatForm = memo(() => {
  const dispatch = useAppDispatch();

  const text = useAppSelector(getMessageText);
  const replyMessage = useAppSelector(getReplyMessage);

  const handleRemoveReplyMessage = useCallback(() => {
    dispatch(chatActions.removeReplyMessage());
  }, [dispatch]);

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

  return (
    <ChatFormView
      text={text}
      replyMessage={replyMessage}
      onRemoveReplyMessage={handleRemoveReplyMessage}
      onChangeText={handleChangeText}
      onChangeFile={handleChangeFile}
      onSubmit={handleSubmit}
    />
  );
});
