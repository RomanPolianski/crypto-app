import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  deleteCartDifferenceInfo,
  deleteCartTotalNow,
  deleteFromCart,
  setCartDifferenceInfo,
  setCartTotalNow,
} from '../../store/cartSlice';
import CloseSvg from '../common/svg/CloseSvg';
import s from './Cart.module.scss';

interface CartRowProps {
  name: string;
  amount: number;
  priceUsd: string;
}
const CartRow: FC<CartRowProps> = ({ name, amount, priceUsd }): JSX.Element => {
  const dispatch = useDispatch();
  const currencies = useSelector(
    (state: RootState) => state.currency.currencies
  );

  const itemIndex = currencies.findIndex((item) => item.name === name);

  const priceNow = currencies[itemIndex].priceUsd;
  const totalCoinPriceNow = Number(priceNow) * amount;
  const isRising = Number(priceUsd) < Number(priceNow);
  const difference = (Number(priceNow) * 100) / Number(priceUsd) - 100;

  const handleDeleteCoin = () => {
    dispatch(deleteFromCart(name));
  };

  useEffect(() => {
    dispatch(setCartTotalNow(totalCoinPriceNow));
    return () => {
      dispatch(deleteCartTotalNow());
    };
  }, [name]);

  return (
    <tr>
      <td data-label="Coin">{name}</td>
      <td data-label="Amount">{amount}</td>
      <td data-label="Price when added">{priceUsd.slice(0, 8)} $</td>
      <td data-label="Price now">
        <span className={classNames(isRising ? s.green : s.red)}>
          {Number(priceNow).toFixed(2)} $
        </span>
        <span>
          <i className={classNames(s.arrow, isRising ? s.up : s.down)} />
        </span>
      </td>
      <td data-label="Total when added">
        {(amount * Number(priceUsd)).toFixed(2)} $
      </td>
      <td data-label="Total now">
        <span className={classNames(isRising ? s.green : s.red)}>
          {totalCoinPriceNow.toFixed(2)} $
        </span>
        <span>
          <i className={classNames(isRising ? s.green : s.red)} />
        </span>
      </td>

      <td data-label="Difference">{difference.toString().slice(0, 6)} %</td>

      <td data-label="">
        <button
          type="button"
          onClick={handleDeleteCoin}
          className={s.deleteButton}
        >
          <CloseSvg />
        </button>
      </td>
    </tr>
  );
};

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
    <CartRow name={p.name} amount={p.numberAmount} priceUsd={p.priceUsd} />
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
              Initial Total:<b> {cartTotal.toFixed(2)}</b> $
            </p>
            <p>
              Total now:<b> {cartTotalNow.toFixed(2)}</b> $
            </p>
            <p>
              Difference:{' '}
              <p
                className={classNames(
                  differenceCartTotalPercent > 0 ? s.green : s.red
                )}
              >
                <b>{differenceCartTotal.toFixed(2)} $</b>
              </p>
            </p>
            <p>
              Difference in %:{' '}
              <p
                className={classNames(
                  differenceCartTotalPercent > 0 ? s.green : s.red
                )}
              >
                <b>{differenceCartTotalPercent.toFixed(2)} %</b>
              </p>
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
