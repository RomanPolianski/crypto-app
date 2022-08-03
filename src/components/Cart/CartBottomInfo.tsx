import classNames from 'classnames';
import { FC } from 'react';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import styles from './Cart.module.scss';

interface CartBottomInfoProps {
  cartTotal: number;
  cartTotalNow: number;
  differenceCartTotalPercent: number;
  differenceCartTotal: number;
}

const CartBottomInfo: FC<CartBottomInfoProps> = ({
  cartTotal,
  cartTotalNow,
  differenceCartTotalPercent,
  differenceCartTotal,
}): JSX.Element => {
  return (
    <div className={styles.table__infoContainer}>
      <p>
        Initial Total:<b> {toUSD(cartTotal)}</b>
      </p>
      <p>
        Total now:<b> {toUSD(cartTotalNow)}</b>
      </p>
      <p>
        Difference:{' '}
        <span
          className={classNames(
            differenceCartTotalPercent > 0
              ? styles.arrow__green
              : styles.arrow__red,
            differenceCartTotalPercent === 0 ? styles.arrow__black : ''
          )}
        >
          <b>{toUSD(differenceCartTotal)}</b>
        </span>
      </p>
      <p className={styles.lastInfoItem}>
        Difference %:{' '}
        <span
          className={classNames(
            differenceCartTotalPercent > 0
              ? styles.arrow__green
              : styles.arrow__red,
            differenceCartTotalPercent === 0 ? styles.arrow__black : ''
          )}
        >
          <b>{differenceCartTotalPercent.toFixed(3)} %</b>
        </span>
      </p>
    </div>
  );
};

export default CartBottomInfo;
