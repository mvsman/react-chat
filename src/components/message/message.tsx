import { memo } from 'react';
import cn from 'classnames';

import { IMessage } from '../../schema/schema';
import s from './message.module.scss';

interface MessageProps {
  message: IMessage;
  isReplyMessage?: boolean;
  onReply: (id: number) => void;
}

export const Message = memo(
  ({
    message: { id, parentId, username, text, time, imageUrl },
    isReplyMessage,
    onReply,
  }: MessageProps) => (
    <div className={cn(s.message, isReplyMessage && s.message_active)}>
      <div className={s.header}>
        <div className={s.meta}>
          <span>({id})</span>
          <span className={s.username}>{username}</span>
          {parentId && (
            <span className={s.reply}>
              Ответ на сообщение: ({parentId}){' '}
              <span className={s.username}>{username}</span>
            </span>
          )}
        </div>
        <span>{time}</span>
      </div>
      <div className={s.body}>
        <span className={s.text}>{text}</span>
        {imageUrl && <img className={s.image} src={imageUrl} alt="" />}
        <button className={s.button} onClick={() => onReply(id)}>
          Ответить
        </button>
      </div>
    </div>
  )
);
