/* eslint-disable react/require-default-props */
import classNames from 'classnames';
import { FC } from 'react';
import styles from './TrendArrow.module.scss';

interface TrendArrowProps {
  isRising: boolean;
  difference?: number;
}

export const TrendArrow: FC<TrendArrowProps> = ({
  isRising,
  difference,
}): JSX.Element => {
  return (
    <i
      className={classNames(
        styles.arrow,
        isRising ? styles.arrow__green : styles.arrow__red,
        difference === 0 ? styles.arrow__black : '',
        isRising ? styles.arrow__up : styles.arrow__down
      )}
    />
  );
};
