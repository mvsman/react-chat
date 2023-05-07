import { Portal } from '../portal/portal';
import s from './alert.module.scss';

interface AlertProps {
  text?: string;
  closeText?: string;
  show?: boolean;
  onClose: () => void;
}

export const Alert = ({ text, closeText, show, onClose }: AlertProps) => {
  if (!show) return null;

  return (
    <Portal>
      <div className={s.alert}>
        {text && <span>{text}</span>}
        <button onClick={onClose}>{closeText}</button>
      </div>
    </Portal>
  );
};
