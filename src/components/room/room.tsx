import { Chat } from '../chat/chat';

import s from './room.module.scss';

interface RoomProps {
  name: string;
}

export const Room = ({ name }: RoomProps) => {
  return (
    <div className={s.room}>
      <Chat title={name} />
    </div>
  );
};
