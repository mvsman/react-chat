import { useCallback, useEffect, useRef } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { chatActions, getReplyMessage } from '../../store/chat';
import { Message } from '../message/message';
import { useScrollToBottom } from '../../hooks/use-scroll';
import { onScrollToParentMessage } from './utils';
import { roomDB } from '../../db/db';
import { IMessage } from '../../schema/schema';

import s from './message-feed.module.scss';

export const MessageFeed = () => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);

  const messages = useLiveQuery<IMessage[]>(() => roomDB.messages.toArray());

  const replyMessage = useAppSelector(getReplyMessage);

  useScrollToBottom(ref.current as HTMLDivElement, messages);

  useEffect(() => {
    if (messages) {
      dispatch(chatActions.messagesReceived(messages));
    }
  }, [dispatch, messages]);

  const onReplyMessage = useCallback(
    (id: number) => {
      dispatch(chatActions.setReplyMessage(id));
    },
    [dispatch]
  );

  return (
    <div ref={ref} className={s.feed}>
      {messages?.map((m) => (
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
