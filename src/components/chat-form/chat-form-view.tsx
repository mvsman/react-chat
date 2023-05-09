import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
  useCallback,
  useRef,
} from 'react';
import { Reply } from '../reply/reply';
import { UploadButton } from '../upload-button/upload-button';
import { useAppSelector } from '../../store/store';
import { getMessageText } from '../../store/message';
import { getReplyMessage } from '../../store/chat';

import s from './chat-form.module.scss';

interface ChatFormViewProps {
  onRemoveReplyMessage: () => void;
  onChangeText: ChangeEventHandler<HTMLTextAreaElement>;
  onChangeFile: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler;
  onSubmitByEnter: KeyboardEventHandler;
}

export const ChatFormView = ({
  onRemoveReplyMessage,
  onChangeText,
  onChangeFile,
  onSubmit,
  onSubmitByEnter,
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
        onKeyDown={onSubmitByEnter}
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
