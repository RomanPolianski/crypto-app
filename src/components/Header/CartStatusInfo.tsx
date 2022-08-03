import { useSelector } from 'react-redux';
import { FC } from 'react';
import classNames from 'classnames';
import styles from './Header.module.scss';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import { RootState } from '../../store';

const CartStatusInfo: FC = (): JSX.Element => {
  const totalCartDifference = useSelector(
    (state: RootState) => state.cart.prevDifferenceCartTotal
  );
  const totalCartDifferencePercent = useSelector(
    (state: RootState) => state.cart.prevDifferenceCartTotalPercent
  );
  const histCartTotal = useSelector(
    (state: RootState) => state.cart.histCartTotal
  );
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);

  return (
    <span className={classNames(styles.header__cartStatus, styles.cartStatus)}>
      <span>
        {cartTotal === histCartTotal[0] || !histCartTotal[0]
          ? toUSD.format(cartTotal)
          : toUSD.format(histCartTotal[0])}
      </span>
      <span className={styles.cartStatus__text}>
        USD {totalCartDifference.toFixed(2)}{' '}
        <span>
          {!Number.isNaN(totalCartDifferencePercent) &&
          totalCartDifferencePercent &&
          Number.isFinite(totalCartDifferencePercent)
            ? `(${totalCartDifferencePercent.toFixed(2)}%)`
            : ''}
        </span>
      </span>
    </span>
  );
};

export default CartStatusInfo;
