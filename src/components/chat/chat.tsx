import { ChatForm } from '../chat-form/chat-form';
import { MessageFeed } from '../message-feed/message-feed';

import s from './chat.module.scss';

interface ChatProps {
  title: string;
}

export const Chat = ({ title }: ChatProps) => {
  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h4 className={s.title}>{title}</h4>

        <MessageFeed />

        <ChatForm />
      </div>
    </div>
  );
};
