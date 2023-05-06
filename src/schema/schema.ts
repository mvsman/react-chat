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

export enum ValidationError {
  USERNAME_IS_BUSY = 'Пользователь с таким именем уже существует!',
  INCORRECT_USERNAME = 'Пользователь с таким именем не существует!',
  INCORRECT_PASSWORD = 'Неверный пароль!',
  ERROR = 'Ошибка!',
}
