import { ChangeEvent, FormEvent, useState } from 'react';
import { options } from './utils';

import s from './lobby.module.scss';
import { Modal } from '../ui/modal/modal';
import { LoginForm } from '../login-form/login-form';
import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  addUser,
  getUserErrorMessage,
  getUserPassword,
  getUsername,
  userActions,
} from '../../store/user';
import { chatActions } from '../../store/chat';
import { room } from '../../helpers/room';
import { LoginModal } from '../login-modal/login-modal';

export const Lobby = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState<boolean>(true);

  const username = useAppSelector(getUsername);
  const password = useAppSelector(getUserPassword);

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(userActions.setUsername(e.target.value));
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(userActions.setPassword(e.target.value));
  };

  const handleChangeRoom = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(chatActions.setChatRoom(e.target.value));
  };

  const handleRoomEntry = (e: FormEvent) => {
    e.preventDefault();
    const route = `${window.location.href}${room}`;
    window.open(route, '_blank');
  };

  return (
    <>
      <div className={s.lobby}>
        <div className={s.login}>
          <LoginForm
            submitText="Войти в комнату"
            username={username}
            password={password}
            onChangeUsername={handleChangeUsername}
            onChangePassword={handleChangePassword}
            onSubmit={handleRoomEntry}
          />
          <button
            className={s.reg}
            type="button"
            onClick={() => setShowModal(true)}
          >
            Нет аккаунта? Зарегистрироваться
          </button>
        </div>
      </div>
      <LoginModal showModal={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};
