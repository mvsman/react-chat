import { ChangeEventHandler, FormEventHandler } from 'react';
import { useAppSelector } from '../../store/store';
import { getUserErrorSigninMessage } from '../../store/user';
import { Input } from '../ui/input/input';
import { Select, SelectOption } from '../ui/select/select';

import s from './login-form.module.scss';

interface LoginFormViewProps {
  username: string;
  password: string;
  room: string;
  options: SelectOption[];
  onOpenModal: () => void;
  onChangeUsername: ChangeEventHandler;
  onChangePassword: ChangeEventHandler;
  onChangeRoom: ChangeEventHandler;
  onRoomEntry: FormEventHandler;
}

export const LoginFormView = ({
  username,
  password,
  room,
  options,
  onOpenModal,
  onChangeUsername,
  onChangePassword,
  onChangeRoom,
  onRoomEntry,
}: LoginFormViewProps) => {
  const errorMessage = useAppSelector(getUserErrorSigninMessage);

  return (
    <form className={s.form} onSubmit={onRoomEntry}>
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

      <button
        className={s.submit}
        type="submit"
        disabled={!username || !password}
      >
        Войти
      </button>

      <button className={s.reg} type="button" onClick={onOpenModal}>
        Нет аккаунта? Зарегистрироваться
      </button>
      {errorMessage && <span className={s.error}>{errorMessage}</span>}
    </form>
  );
};
