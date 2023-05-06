import { useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  chatActions,
  getReplyMessage,
  messagesReceived,
  getChat,
} from '../../store/chat';
import { Message } from '../message/message';
import { useScrollToBottom } from '../../hooks/use-scroll';
import { onScrollToParentMessage } from './utils';

import s from './message-feed.module.scss';

export const MessageFeed = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const messages = useAppSelector(getChat.selectAll);
  const replyMessage = useAppSelector(getReplyMessage);

  useScrollToBottom(ref.current as HTMLDivElement, messages);

  useEffect(() => {
    dispatch(messagesReceived());
  }, [dispatch]);

  const onReplyMessage = useCallback(
    (id: number) => {
      dispatch(chatActions.setReplyMessage(id));
    },
    [dispatch]
  );

  return (
    <div ref={ref} className={s.feed}>
      {messages.map((m) => (
        <Message
          key={m.id}
          message={m}
          isReplyMessage={replyMessage?.id === m.id}
          onReply={onReplyMessage}
          onScrollToParentMessage={onScrollToParentMessage}
        />
      ))}
    </div>
  );
};
