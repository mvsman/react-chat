import { Lobby } from './components/lobby/lobby';
import { Room } from './components/room/room';
import { room } from './helpers/room';

import './index.css';

export const App = () => (
  <div className="page">{!room ? <Lobby /> : <Room name={room} />}</div>
);
