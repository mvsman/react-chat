export interface MessageSchema {
  id: string;
  userId: string;
  username: string;
  room: string;
  time: string;
  text: string;
}

export interface Message {
  id?: string;
  username?: string;
  text?: string;
  time?: string;
  imageUrl?: string;
}

export interface ChatSchema {
  room: string;
  messages: MessageSchema[];
}
