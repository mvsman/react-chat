import { memo, SelectHTMLAttributes } from 'react';

import s from './select.module.scss';

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id?: string;
  label?: string;
  options: SelectOption[];
}

export const Select = memo(({ id, label, options, ...props }: SelectProps) => {
  return (
    <label className={s.field} htmlFor={id}>
      {label && <span>{label}</span>}
      <select className={s.input} id={id} {...props}>
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
});
