import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  deleteCartDifferenceInfo,
  setCartDifferenceInfo,
} from '../../store/cartSlice';
import { toPercent } from '../../utils/formatters/toPercentFormatter';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import s from './Cart.module.scss';
import CartRow from './CartRow';

const Cart: FC = (): JSX.Element => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
  const cartTotalNow = useSelector(
    (state: RootState) => state.cart.cartTotalNow
  );
  const dispatch = useDispatch();

  const differenceCartTotalPercent = (cartTotalNow * 100) / cartTotal - 100;
  const differenceCartTotal = cartTotalNow - cartTotal;

  const c = cartItems.map((p) => (
    <CartRow
      name={p.name}
      amount={p.numberAmount}
      priceUsd={p.priceUsd}
      key={p.name}
    />
  ));

  useEffect(() => {
    dispatch(
      setCartDifferenceInfo({ differenceCartTotal, differenceCartTotalPercent })
    );
    return () => {
      dispatch(deleteCartDifferenceInfo());
    };
  });

  return (
    <div>
      {cartItems.length !== 0 ? (
        <>
          <h1 className={s.header}>Portfolio.</h1>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Amount</th>
                <th>Price when added</th>
                <th>Price Now</th>
                <th>Total when added</th>
                <th>Total Now</th>
                <th>Difference</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{c}</tbody>
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
            <p>
              Difference in %:{' '}
              <span
                className={classNames(
                  differenceCartTotalPercent > 0 ? s.green : s.red,
                  differenceCartTotalPercent === 0 ? s.black : ''
                )}
              >
                <b>{toPercent.format(differenceCartTotalPercent)}</b>
              </span>
            </p>
          </table>
        </>
      ) : (
        <h1 className={s.header}>Your Portfolio is Empty!</h1>
      )}
    </div>
  );
};

export default Cart;
