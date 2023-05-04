import { forwardRef, memo } from 'react';
import s from './upload-button.module.scss';

interface UploadButtonProps {
  onUploadFile: () => void;
}

export const UploadButton = memo(
  forwardRef<HTMLInputElement, UploadButtonProps>(
    ({ onUploadFile }, forwardedRef) => {
      return (
        <div className={s.upload}>
          <button className={s.button} type="button" onClick={onUploadFile}>
            Прикрепить png/jpg
          </button>
          <input
            className={s.input}
            ref={forwardedRef}
            type="file"
            accept="image/png, image/jpg, image/jpeg"
          />
        </div>
      );
    }
  )
);
