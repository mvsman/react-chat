import { getMessageImageUrl, messageActions } from '../../store/message';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { ChatForm } from '../chat-form/chat-form';
import { MessageFeed } from '../message-feed/message-feed';
import { Alert } from '../ui/alert/alert';

import s from './chat.module.scss';

interface ChatProps {
  title: string;
}

export const Chat = ({ title }: ChatProps) => {
  const dispatch = useAppDispatch();
  const image = useAppSelector(getMessageImageUrl);

  const handleResetMessageImage = () => {
    dispatch(messageActions.resetMessageImage());
  };

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h4 className={s.title}>{title}</h4>

        <MessageFeed />

        <ChatForm />
      </div>
      <Alert
        show={!!image}
        text="Прикреплено изображение"
        closeText="Отмена"
        onClose={handleResetMessageImage}
      />
    </div>
  );
};
