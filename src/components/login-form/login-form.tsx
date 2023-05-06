import { ChangeEvent, FormEvent, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { getUserErrorMessage, checkUserIsRegistered } from '../../store/user';
import { chatActions, getChatRoom } from '../../store/chat';
import { Input } from '../ui/input/input';
import { Select } from '../ui/select/select';

import s from './login-form.module.scss';

const options = [
  {
    label: 'Комната 1',
    value: 'room1',
  },
  {
    label: 'Комната 2',
    value: 'room2',
  },
  {
    label: 'Комната 3',
    value: 'room3',
  },
];

interface LoginFormProps {
  className?: string;
  onOpenModal: () => void;
}

export const LoginForm = ({ className, onOpenModal }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const disabled = !username || !password;

  const errorMessage = useAppSelector(getUserErrorMessage);
  const room = useAppSelector(getChatRoom);

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRoom = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(chatActions.setChatRoom(e.target.value));
  };

  const onRoomEntry = (e: FormEvent) => {
    e.preventDefault();
    dispatch(checkUserIsRegistered({ username, password }))
      .unwrap()
      .then(() => {
        const route = `${window.location.href}${room}`;
        window.open(route, '_blank');
      });
  };

  return (
    <form className={cn(s.form, className)} onSubmit={onRoomEntry}>
      <Input
        label="Имя пользователя"
        id="username"
        value={username}
        onChange={onChangeUsername}
      />

      <Input
        label="Пароль"
        id="password"
        type="password"
        value={password}
        onChange={onChangePassword}
      />

      <Select
        label="Выберите комнату"
        options={options}
        value={room}
        onChange={onChangeRoom}
      />

      <button className={s.submit} type="submit" disabled={disabled}>
        Войти
      </button>

      <button className={s.reg} type="button" onClick={onOpenModal}>
        Нет аккаунта? Зарегистрироваться
      </button>
      {errorMessage && <span className={s.error}>{errorMessage}</span>}
    </form>
  );
};
