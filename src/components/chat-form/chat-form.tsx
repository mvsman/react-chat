import {
  ChangeEvent,
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  memo,
} from 'react';
import { IMessage } from '../../schema/schema';
import { Reply } from '../reply/reply';
import { UploadButton } from '../upload-button/upload-button';

import s from './chat-form.module.scss';

export interface ChatFormRefs {
  textareaRef: HTMLTextAreaElement | null;
  fileRef: HTMLInputElement | null;
}

interface ChatFormProps {
  replyMessage?: IMessage;
  onClearReplyMessage: () => void;
  onSubmit: (e: FormEvent) => Promise<void>;
}

export const ChatForm = memo(
  forwardRef<ChatFormRefs, ChatFormProps>(
    ({ replyMessage, onClearReplyMessage, onSubmit }, forwardedRef) => {
      const textareaRef = useRef<HTMLTextAreaElement>(null);
      const fileRef = useRef<HTMLInputElement>(null);

      useImperativeHandle(forwardedRef, () => ({
        textareaRef: textareaRef.current,
        fileRef: fileRef.current,
      }));

      const onUploadFile = useCallback(() => {
        if (fileRef.current) {
          fileRef.current.click();
        }
      }, []);

      const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (textareaRef.current) {
          textareaRef.current.value = e.target.value;
        }
      };

      return (
        <form className={s.form} onSubmit={onSubmit}>
          <textarea
            className={s.field}
            ref={textareaRef}
            placeholder="Введите ваше сообщение"
            onChange={onChange}
          />
          <div className={s.buttons}>
            <UploadButton ref={fileRef} onUploadFile={onUploadFile} />
            <button className={s.submit} type="submit">
              Отправить
            </button>
          </div>

          {replyMessage && (
            <Reply message={replyMessage} onCancel={onClearReplyMessage} />
          )}
        </form>
      );
    }
  )
);
