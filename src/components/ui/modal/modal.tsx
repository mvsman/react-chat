import { KeyboardEvent, MouseEvent, ReactNode } from 'react';
import s from './modal.module.scss';
import { Portal } from './portal';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  const handleClose = (
    e: KeyboardEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>
  ) => {
    if ('key' in e && e.key === 'Enter') {
      onClose();
      return;
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className={s.modal} onClick={handleClose}>
        <div className={s.overlay}>
          <div className={s.content} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
