import { SelectHTMLAttributes } from 'react';

import s from './select.module.scss';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label?: string;
  options: SelectOption[];
}

export const Select = ({ id, label, options }: SelectProps) => {
  return (
    <label className={s.field} htmlFor={id}>
      {label && <span>{label}</span>}
      <select className={s.input} id={id}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
};
