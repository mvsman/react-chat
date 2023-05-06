import { ChangeEventHandler, FormEventHandler } from 'react';
import cn from 'classnames';

import { Input } from '../ui/input/input';
import s from './login-form.module.scss';

interface LoginFormProps {
  className?: string;
  submitText?: string;
  username: string;
  password: string;
  onChangeUsername: ChangeEventHandler<HTMLInputElement>;
  onChangePassword: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler;
}

export const LoginForm = ({
  className,
  submitText,
  username,
  password,
  onChangeUsername,
  onChangePassword,
  onSubmit,
}: LoginFormProps) => {
  const disabled = !username && !password;
  return (
    <form className={cn(s.form, className)} onSubmit={onSubmit}>
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

      <button className={s.submit} type="submit" disabled={disabled}>
        {submitText}
      </button>
    </form>
  );
};
