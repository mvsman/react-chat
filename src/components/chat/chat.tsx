import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { IMessage } from '../../schema/schema';
import { Message } from '../message/message';
import { UploadButton } from '../upload-button/upload-button';

import s from './chat.module.scss';

interface ChatProps {
  title: string;
}

const initTransaction = (idb: IDBOpenDBRequest) => {
  const request = idb.result;

  const transaction = request.transaction('messages', 'readwrite');
  const messages = transaction.objectStore('messages');

  return messages;
};

export const Chat = ({ title }: ChatProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<IMessage[]>();
  const [imageUrl, setImageUrl] = useState<string>('');

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
      const messages = initTransaction(idb);

      const getAllRequest = messages.getAll();
      getAllRequest.onsuccess = () => {
        setData(getAllRequest.result);
      };
    };
  }, [title]);

  const onUploadFile = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.value = e.target.value;
    }
  };

  const onResetRef = () => {
    if (ref.current) {
      ref.current.value = '';
    }
  };

  const onReadImage = () => {
    return new Promise<string>((resolve, reject) => {
      if (!fileRef.current?.files?.length) {
        reject('');
        return;
      }

      const file = fileRef.current.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target?.result) {
          const bits = e.target.result as string;
          // setImageUrl(bits);
          resolve(bits);
        }
      };

      reader.readAsBinaryString(file);
    });
  };

  const normalizeMessage = (count: number, bin: string): IMessage => {
    const id = count + 1;
    const username = localStorage.getItem('username') as string;
    const text = ref.current?.value ?? '';
    const time = new Date().toLocaleString();
    const img = bin ? 'data:image/jpeg;base64,' + btoa(bin) : '';

    return {
      id,
      username,
      text,
      time,
      imageUrl: img,
    };
  };

  const onAddMessage = (
    count: number,
    messages: IDBObjectStore,
    bin: string
  ) => {
    const message = normalizeMessage(count, bin);

    const addMessageRequest = messages.add(message);

    addMessageRequest.onsuccess = () => {
      console.log('Сообщение добавлено в хранилище', addMessageRequest.result);

      const getAllRequest = messages.getAll();

      getAllRequest.onsuccess = () => {
        setData(getAllRequest.result);
        onResetRef();
      };
    };
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const bin = await onReadImage();
    const idb = indexedDB.open(title);

    idb.onsuccess = () => {
      const messages = initTransaction(idb);
      const messagesCount = messages.count();

      messagesCount.onsuccess = () => {
        onAddMessage(messagesCount.result, messages, bin);
      };
    };
  };

  return (
    <div className={s.wrapper}>
      <div className={s.inner}>
        <h4 className={s.title}>{title}</h4>

        <div className={s.chat}>
          {data?.length && data.map((m) => <Message key={m.id} message={m} />)}
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
        </form>
      </div>
    </div>
  );
};
