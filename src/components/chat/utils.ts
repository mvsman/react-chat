import { IMessage } from '../../schema/schema';

export const initTransaction = (idb: IDBOpenDBRequest, name: string) => {
  const request = idb.result;

  const transaction = request.transaction(name, 'readwrite');
  const messages = transaction.objectStore(name);

  return messages;
};

export const convertImageToBinary = (input: HTMLInputElement | null) => {
  return new Promise<string>((resolve) => {
    if (!input?.files?.length) {
      resolve('');
      return;
    }

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target?.result) {
        const bits = e.target.result as string;
        resolve(bits);
      }
    };

    reader.readAsBinaryString(file);
  });
};

export const prepareMessage = (
  parentId: number | undefined,
  count: number,
  input: HTMLTextAreaElement | null,
  bin: string
): IMessage => {
  const username = localStorage.getItem('username') as string;
  const text = input?.value ?? '';
  const time = new Date().toLocaleString();
  const imageUrl = bin ? 'data:image/jpeg;base64,' + btoa(bin) : '';

  return {
    id: count + 1,
    parentId,
    username,
    text,
    time,
    imageUrl,
  };
};
