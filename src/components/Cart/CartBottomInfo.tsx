import classNames from 'classnames';
import { FC } from 'react';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import s from './Cart.module.scss';

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
    <div className={s.infoContainer}>
      <p>
        Initial Total:<b> {toUSD.format(cartTotal)}</b>
      </p>
      <p>
        Total now:<b> {toUSD.format(cartTotalNow)}</b>
      </p>
      <p>
        Difference:{' '}
        <span
          className={classNames(
            differenceCartTotalPercent > 0 ? s.green : s.red,
            differenceCartTotalPercent === 0 ? s.black : ''
          )}
        >
          <b>{toUSD.format(differenceCartTotal)}</b>
        </span>
      </p>
      <p className={s.lastInfoItem}>
        Difference in %:{' '}
        <span
          className={classNames(
            differenceCartTotalPercent > 0 ? s.green : s.red,
            differenceCartTotalPercent === 0 ? s.black : ''
          )}
        >
          <b>{differenceCartTotalPercent.toFixed(2)} %</b>
        </span>
      </p>
    </div>
  );
};

export default CartBottomInfo;
