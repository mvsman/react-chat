import { useState } from 'react';

import { LoginForm } from '../login-form/login-form';
import { LoginModal } from '../login-modal/login-modal';

import s from './lobby.module.scss';

export const Lobby = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <>
      <div className={s.lobby}>
        <LoginForm onOpenModal={() => setShowModal(true)} />
      </div>
      <LoginModal showModal={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
