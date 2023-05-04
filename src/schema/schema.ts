export interface IMessage {
  id: number;
  parentId?: number;
  username?: string;
  text?: string;
  time?: string;
  imageUrl?: string;
}
