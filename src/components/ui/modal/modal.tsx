import { ReactNode } from 'react';

import { Portal } from '../portal/portal';

import s from './modal.module.scss';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ children, isOpen, onClose }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className={s.modal} onClick={onClose}>
        <div className={s.overlay}>
          <div className={s.content} onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
