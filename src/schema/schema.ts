export type Status = 'idle' | 'loading' | 'error' | 'success';

export interface IMessage {
  id: number;
  parentId?: number;
  username?: string;
  text?: string;
  time?: string;
  imageUrl?: string;
}

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
