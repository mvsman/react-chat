import { FormEvent, useEffect, useRef, useState, useCallback } from 'react';
import { IMessage } from '../../schema/schema';
import { Message } from '../message/message';
import { ChatForm, ChatFormRefs } from '../chat-form/chat-form';
import { useScrollToBottom } from '../../hooks/use-scroll';
import { STORE_NAME } from '../const/index';
import { convertImageToBinary, initTransaction, prepareMessage } from './utils';

import s from './chat.module.scss';

interface ChatProps {
  title: string;
}

export const Chat = ({ title }: ChatProps) => {
  const childRef = useRef<ChatFormRefs>(null);
  const chatRef = useRef<HTMLDivElement>(null);

  const [data, setData] = useState<IMessage[]>();
  const [replyMessage, setReplyMessage] = useState<IMessage>();

  useScrollToBottom(chatRef.current as HTMLDivElement, data);

  useEffect(() => {
    const idb = indexedDB.open(title);

    idb.onupgradeneeded = () => {
      const request = idb.result;

      if (!request.objectStoreNames.contains(STORE_NAME)) {
        request.createObjectStore(STORE_NAME, {
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

  const onResetRefs = () => {
    if (childRef.current?.textareaRef) {
      childRef.current.textareaRef.value = '';
    }

    if (childRef.current?.fileRef) {
      childRef.current.fileRef.value = '';
    }
  };

  const onReplyMessage = useCallback(
    (id: number) => {
      if (!data?.length) return;

      const parentMessage = data.find((m) => m.id === id);
      setReplyMessage(parentMessage as IMessage);
    },
    [data]
  );

  const onClearReplyMessage = useCallback(() => {
    if (replyMessage) {
      setReplyMessage(undefined);
    }
  }, [replyMessage]);

  const onScrollToParentMessage = (parentId: number) => {
    const parentMessage = document.querySelector(`[data-id="${parentId}"]`);

    if (parentMessage) {
      parentMessage.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const onAddMessage = useCallback(
    (count: number, messages: IDBObjectStore, bin: string) => {
      const message = prepareMessage(
        replyMessage?.id,
        count,
        childRef.current!.textareaRef,
        bin
      );

      const addMessageRequest = messages.add(message);

      addMessageRequest.onsuccess = () => {
        const getAllRequest = messages.getAll();

        getAllRequest.onsuccess = () => {
          setData(getAllRequest.result);
          onResetRefs();
          onClearReplyMessage();
        };
      };
    },
    [onClearReplyMessage, replyMessage?.id]
  );

  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const bin = await convertImageToBinary(childRef.current!.fileRef);
      const idb = indexedDB.open(title);

      idb.onsuccess = () => {
        const messages = initTransaction(idb, STORE_NAME);
        const messagesCount = messages.count();

        messagesCount.onsuccess = () => {
          onAddMessage(messagesCount.result, messages, bin);
        };
      };
    },
    [onAddMessage, title]
  );

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
                  onScrollToParentMessage={onScrollToParentMessage}
                />
              ))
            : null}
        </div>

        <ChatForm
          ref={childRef}
          replyMessage={replyMessage}
          onClearReplyMessage={onClearReplyMessage}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};
