import { ChangeEvent, FormEvent, useCallback, useState } from 'react';

import { useAppDispatch } from '../../store/store';
import { checkUserIsRegistered } from '../../store/user';
import { SelectOption } from '../ui/select/select';
import { LoginFormView } from './login-form-view';

const options: SelectOption[] = [
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
  onOpenModal: () => void;
}

export const LoginForm = ({ onOpenModal }: LoginFormProps) => {
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [room, setRoom] = useState<string>(options[0].value);

  const handleChangeUsername = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsername(e.target.value);
    },
    []
  );

  const handleChangePassword = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleChangeRoom = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.target.value);
  }, []);

  const handleRoomEntry = (e: FormEvent) => {
    e.preventDefault();
    dispatch(checkUserIsRegistered({ username, password }))
      .unwrap()
      .then(() => {
        const route = `${window.location.href}${room}`;
        window.open(route, '_blank');
      });
  };

  return (
    <LoginFormView
      username={username}
      password={password}
      room={room}
      options={options}
      onOpenModal={onOpenModal}
      onChangeUsername={handleChangeUsername}
      onChangePassword={handleChangePassword}
      onChangeRoom={handleChangeRoom}
      onRoomEntry={handleRoomEntry}
    />
  );
};
