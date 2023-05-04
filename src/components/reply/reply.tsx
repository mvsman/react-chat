import { IMessage } from '../../schema/schema';
import s from './reply.module.scss';

interface ReplyProps {
  message: IMessage;
  onCancel: () => void;
}

export const Reply = ({
  message: { id, username, time },
  onCancel,
}: ReplyProps) => {
  return (
    <div className={s.reply}>
      <div className={s.content}>
        <span className={s.username}>
          Ответ на сообщение: ({id}) {username}
        </span>
        <div className={s.meta}>
          <span className={s.time}>{time}</span>
          <button className={s.cancel} type="button" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
