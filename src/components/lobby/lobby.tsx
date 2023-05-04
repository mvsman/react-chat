import { ChangeEvent, FormEvent, useState } from 'react';
import { LS_USERNAME_KEY } from '../const/index';
import { options } from './utils';

import s from './lobby.module.scss';

const rooms = options.map(({ label, value }) => (
  <option key={label} value={value}>
    {label}
  </option>
));

export const Lobby = () => {
  const [username, setUsername] = useState<string>('');
  const [room, setRoom] = useState<string>(options[0].value);

  const onChangeRoom = (e: ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (value.trim()) {
      setUsername(value);
    } else {
      setUsername('');
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    localStorage.setItem(LS_USERNAME_KEY, username);

    const route = `${window.location.href}${room}`;
    window.open(route, '_blank');
  };

  return (
    <div className={s.lobby}>
      <form className={s.form} onSubmit={onSubmit}>
        <label className={s.field} htmlFor="username">
          <span>Введите свое имя</span>
          <input
            className={s.input}
            type="text"
            id="username"
            name="username"
            placeholder="Поле обязательно для заполнения"
            value={username}
            onChange={onChangeUsername}
          />
        </label>

        <label className={s.field} htmlFor="room">
          <span>Выберите комнату</span>
          <select
            className={s.input}
            id="room"
            name="room"
            value={room}
            onChange={onChangeRoom}
          >
            {rooms}
          </select>
        </label>
        <button className={s.submit} type="submit" disabled={!username}>
          Войти в комнату
        </button>
      </form>
    </div>
  );
};
