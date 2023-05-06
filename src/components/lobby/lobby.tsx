import { useState } from 'react';

import { LoginForm } from '../login-form/login-form';
import { LoginModal } from '../login-modal/login-modal';

import s from './lobby.module.scss';

export const Lobby = () => {
  const [showModal, setShowModal] = useState<boolean>(true);

  return (
    <>
      <div className={s.lobby}>
        {/* <div className={s.login}> */}
        <LoginForm onOpenModal={() => setShowModal(true)} />
        {/* </div> */}
      </div>
      <LoginModal showModal={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
