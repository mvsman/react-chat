import { Lobby } from './components/lobby/lobby';
import { Room } from './components/room/room';

import './index.css';

const room = window.location.href.split('/').at(-1);

export const App = () => {
  return <div className="page">{!room ? <Lobby /> : <Room name={room} />}</div>;
};
