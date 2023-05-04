import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { IMessage } from '../../schema/schema';
import { Message } from '../message/message';
import { UploadButton } from '../upload-button/upload-button';
import { Reply } from '../reply/reply';
import { useScrollToBottom } from '../../hooks/use-scroll';
import { convertImageToBinary, initTransaction, prepareMessage } from './utils';

import s from './chat.module.scss';

interface ChatProps {
  title: string;
}

const STORE_NAME = 'messages';

export const Chat = ({ title }: ChatProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<IMessage[]>();
  const [replyMessage, setReplyMessage] = useState<IMessage>();

  useScrollToBottom(chatRef.current as HTMLDivElement, data);

  useEffect(() => {
    const idb = indexedDB.open(title);

    idb.onupgradeneeded = () => {
      const request = idb.result;

      if (!request.objectStoreNames.contains('messages')) {
        request.createObjectStore('messages', {
          keyPath: 'id',
          autoIncrement: true,
        });
      }

      request.close();
    };

    idb.onsuccess = () => {
      const messages = initTransaction(idb, STORE_NAME);

      const getAllRequest = messages.getAll();
      getAllRequest.onsuccess = () => {
        setData(getAllRequest.result);
      };
    };
  }, [title]);

  const onUploadFile = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.value = e.target.value;
    }
  };

  const onResetRefs = () => {
    if (ref.current) {
      ref.current.value = '';
    }

    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const onAddMessage = (
    count: number,
    messages: IDBObjectStore,
    bin: string
  ) => {
    const message = prepareMessage(replyMessage?.id, count, ref.current, bin);

    const addMessageRequest = messages.add(message);

    addMessageRequest.onsuccess = () => {
      console.log('Сообщение добавлено в хранилище', addMessageRequest.result);

      const getAllRequest = messages.getAll();

      getAllRequest.onsuccess = () => {
        setData(getAllRequest.result);
        onResetRefs();
        onClearReplyMessage();
      };
    };
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const bin = await convertImageToBinary(fileRef.current);
    const idb = indexedDB.open(title);

    idb.onsuccess = () => {
      const messages = initTransaction(idb, STORE_NAME);
      const messagesCount = messages.count();

      messagesCount.onsuccess = () => {
        onAddMessage(messagesCount.result, messages, bin);
      };
    };
  };

  const onReplyMessage = useCallback(
    (id: number) => {
      if (!data?.length) return;

      const parentMessage = data.find((m) => m.id === id);
      setReplyMessage(parentMessage as IMessage);
    },
    [data]
  );

  const onClearReplyMessage = () => {
    if (replyMessage) {
      setReplyMessage(undefined);
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h4 className={s.title}>{title}</h4>

        <div ref={chatRef} className={s.chat}>
          {data?.length
            ? data.map((m) => (
                <Message
                  key={m.id}
                  message={m}
                  isReplyMessage={replyMessage?.id === m.id}
                  onReply={onReplyMessage}
                />
              ))
            : null}
        </div>

        <form className={s.form} onSubmit={onSubmit}>
          <textarea
            className={s.field}
            ref={ref}
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
      </div>
    </div>
  );
};
