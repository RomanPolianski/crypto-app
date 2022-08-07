import classNames from 'classnames';
import { FC, MouseEventHandler } from 'react';
import CloseSvg from '../../svg/CloseSvg';
import styles from './CloseButton.module.scss';

interface CloseButtonProps {
  variant: string;
  form: string;
  onclick: MouseEventHandler<HTMLButtonElement>;
}

const CloseButton: FC<CloseButtonProps> = ({
  variant,
  form,
  onclick,
}): JSX.Element => {
  const mainClassName = classNames(styles[variant], styles[form]);

  return (
    <button type="button" onClick={onclick} className={mainClassName}>
      <span className={styles.svg}>
        <CloseSvg />
      </span>
    </button>
  );
};

export default CloseButton;
