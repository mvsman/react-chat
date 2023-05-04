import { Chat } from '../chat/chat';

interface RoomProps {
  name: string;
}

export const Room = ({ name }: RoomProps) => {
  return (
    <div>
      <Chat title={name} />
    </div>
  );
};
