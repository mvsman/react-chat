import {
  ChangeEventHandler,
  FormEventHandler,
  useCallback,
  useRef,
} from 'react';
import { Reply } from '../reply/reply';
import { UploadButton } from '../upload-button/upload-button';

import s from './chat-form.module.scss';
import { useAppSelector } from '../../store/store';
import { getMessageText } from '../../store/message';
import { getReplyMessage } from '../../store/chat';

interface ChatFormViewProps {
  onRemoveReplyMessage: () => void;
  onChangeText: ChangeEventHandler<HTMLTextAreaElement>;
  onChangeFile: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler;
}

export const ChatFormView = ({
  onRemoveReplyMessage,
  onChangeText,
  onChangeFile,
  onSubmit,
}: ChatFormViewProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const text = useAppSelector(getMessageText);
  const replyMessage = useAppSelector(getReplyMessage);

  const onUploadFile = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <textarea
        className={s.field}
        placeholder="Введите ваше сообщение"
        value={text}
        onChange={onChangeText}
      />
      <div className={s.buttons}>
        <UploadButton
          ref={fileRef}
          onChangeFile={onChangeFile}
          onUploadFile={onUploadFile}
        />
        <button className={s.submit} type="submit">
          Отправить
        </button>
      </div>

      {replyMessage && (
        <Reply message={replyMessage} onCancel={onRemoveReplyMessage} />
      )}
    </form>
  );
};
