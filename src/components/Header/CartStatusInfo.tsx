import { useSelector } from 'react-redux';
import { FC } from 'react';
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
  const cartTotalNow = useSelector(
    (state: RootState) => state.cart.histCartTotal
  );
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);

  return (
    <p className={s.cartStatusWrapper}>
      <span>
        {cartTotalNow.length
          ? toUSD.format(cartTotalNow[0])
          : toUSD.format(cartTotal)}
      </span>
      <span className={s.cartStatusText}>
        USD {totalCartDifference.toFixed(2)}{' '}
        <span>
          {cartTotalNow ? `(${totalCartDifferencePercent.toFixed(2)}%)` : ''}
        </span>
      </span>
    </p>
  );
};

export default CartStatusInfo;
