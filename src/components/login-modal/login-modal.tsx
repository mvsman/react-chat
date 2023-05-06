import { FormEvent, useState } from 'react';

import { Modal } from '../ui/modal/modal';
import { Input } from '../ui/input/input';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { addUser, getUserErrorMessage } from '../../store/user';

import s from './login-modal.module.scss';

interface LoginModalProps {
  showModal: boolean;
  onClose: () => void;
}

export const LoginModal = ({ showModal, onClose }: LoginModalProps) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const errorMessage = useAppSelector(getUserErrorMessage);

  const handleAddUser = (e: FormEvent) => {
    e.preventDefault();
    dispatch(addUser({ username, password }));

    if (!errorMessage) {
      onClose();
    }
  };

  return (
    <Modal isOpen={showModal} onClose={onClose}>
      <form className={s.form}>
        <h4>Регистрация</h4>
        <Input
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleAddUser}>
          ОК
        </button>
      </form>
    </Modal>
  );
};
