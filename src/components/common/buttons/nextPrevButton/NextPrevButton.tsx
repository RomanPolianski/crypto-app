/* eslint-disable react/require-default-props */
import classNames from 'classnames';
import { FC, MouseEventHandler } from 'react';
import ButtonNextSvg from '../../svg/ButtonNextSvg';
import ButtonPrevSvg from '../../svg/ButtonPrevSvg';
import styles from './NextPrevButton.module.scss';

export interface NextPrevButtonProps {
  type: string;
  onclick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  color: string;
}

export const NextPrevButton: FC<NextPrevButtonProps> = ({
  type,
  onclick,
  disabled,
  color,
}): JSX.Element => {
  return (
    <button
      type="button"
      className={classNames(
        styles.nextprevButton,
        color === 'white' ? styles.nextprevButton__white : ''
      )}
      onClick={onclick}
      disabled={disabled}
    >
      <span className={styles.svg}>
        {type === 'prev' ? <ButtonPrevSvg /> : <ButtonNextSvg />}
      </span>
    </button>
  );
};
