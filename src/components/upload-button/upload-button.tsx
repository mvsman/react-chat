import { ChangeEventHandler, forwardRef, memo } from 'react';
import s from './upload-button.module.scss';

interface UploadButtonProps {
  onChangeFile: ChangeEventHandler<HTMLInputElement>;
  onUploadFile: () => void;
}

export const UploadButton = memo(
  forwardRef<HTMLInputElement, UploadButtonProps>(
    ({ onChangeFile, onUploadFile }, forwardedRef) => {
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
            onChange={onChangeFile}
          />
        </div>
      );
    }
  )
);
