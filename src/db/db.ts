import Dexie, { Table } from 'dexie';
import { room } from '../helpers/room';
import { IMessage } from '../schema/schema';

export class MySubClassedDexie extends Dexie {
  messages!: Table<IMessage>;

  constructor(name: string) {
    super(name);
    this.version(1).stores({
      messages: '++id, parentId, username, text, time, imageUrl',
    });
  }
}
export const db = new MySubClassedDexie(room as string);
