import { useSelector } from 'react-redux';
import { FC, useEffect } from 'react';
import classNames from 'classnames';
import s from './Header.module.scss';
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
    <span className={classNames(s.header__cartStatus, s.cartStatus)}>
      <span>
        {cartTotal === histCartTotal[0] || !histCartTotal[0]
          ? toUSD.format(cartTotal)
          : toUSD.format(histCartTotal[0])}
      </span>
      <span className={s.cartStatus__text}>
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
