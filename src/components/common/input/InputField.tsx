import { FC } from 'react';
import styles from './InputField.module.scss';

interface DataType {
  isEmpty: boolean;
  minLengthError: boolean;
  maxLengthError: boolean;
  zeroError: boolean;
  afterDotError: boolean;
  inputValid: boolean;
  value: string;
  onChange: Function;
  onBlur: Function;
  onSubmitForm: () => void;
  isDirty: boolean;
}

export interface InputFieldProps {
  data: DataType;
}

export const InputField: FC<InputFieldProps> = ({ data }): JSX.Element => {
  return (
    <>
      {' '}
      <input
        className={styles.modal__input}
        type="number"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => data.onChange(e)}
        onBlur={(e) => data.onBlur(e)}
        value={data.value}
        step={0.01}
        min={0}
      />
      {data.isDirty && data.isEmpty && (
        <div className={styles.modal__input_error}>Field cannot be empty!</div>
      )}
      {data.maxLengthError && (
        <div className={styles.modal__input_error}>Max amount is 9 digits!</div>
      )}
      {!data.isEmpty && !data.afterDotError && data.zeroError && (
        <div className={styles.modal__input_error}>Amount must be above 0!</div>
      )}
      {!data.isEmpty && data.afterDotError && (
        <div className={styles.modal__input_error}>
          Max 2 digits after comma
        </div>
      )}
    </>
  );
};
