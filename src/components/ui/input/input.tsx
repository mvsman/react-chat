import { InputHTMLAttributes } from 'react';
import s from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string;
  label?: string;
}

export const Input = ({ id, label, ...props }: InputProps) => {
  return (
    <label className={s.field} htmlFor={id}>
      {label && <span>{label}</span>}
      <input className={s.input} id={id} {...props} />
    </label>
  );
};
