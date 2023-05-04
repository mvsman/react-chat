import { IMessage } from '../../schema/schema';
import s from './message.module.scss';

interface MessageProps {
  message: IMessage;
}

export const Message = ({
  message: { username, text, time, imageUrl },
}: MessageProps) => {
  return (
    <div className={s.message}>
      <div className={s.header}>
        <span>{username}</span>
        <span>{time}</span>
      </div>
      <div className={s.body}>
        <span className={s.text}>{text}</span>
        {imageUrl && <img className={s.image} src={imageUrl} alt="" />}
        <button className={s.response}>Ответить</button>
      </div>
    </div>
  );
};
