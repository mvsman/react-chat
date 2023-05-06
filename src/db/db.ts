import Dexie, { Table } from 'dexie';
import { room } from '../helpers/room';
import { IMessage, IUser } from '../schema/schema';

class RoomDexieClass extends Dexie {
  messages!: Table<IMessage>;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      messages: '++id, parentId, username, text, time, imageUrl',
    });
  }
}

class UsersDexieClass extends Dexie {
  users!: Table<IUser>;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      users: '++id, username, password',
    });
  }
}

export const roomDB = new RoomDexieClass(room as string);
export const usersDB = new UsersDexieClass('users');
