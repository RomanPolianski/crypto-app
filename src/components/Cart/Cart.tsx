/* eslint-disable no-debugger */
/* eslint-disable no-nested-ternary */
import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteFromCart, setCartTotalNow } from '../../store/cartSlice';
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
    debugger;
    dispatch(setCartTotalNow(totalCoinPriceNow));
  }, []);

  return (
    <tr>
      <th>{name}</th>
      <th>{amount}</th>
      <th>{priceUsd.slice(0, 8)} $</th>
      <th>
        <span className={classNames(isRising ? s.green : s.red)}>
          {priceNow.slice(0, 8)} $
        </span>
        <span>
          <i className={classNames(s.arrow, isRising ? s.up : s.down)} />
        </span>
      </th>
      <th>{amount * Number(priceUsd)} $</th>
      <th>
        <span className={classNames(isRising ? s.green : s.red)}>
          {totalCoinPriceNow} $
        </span>
        <span>
          <i className={classNames(isRising ? s.green : s.red)} />
        </span>
      </th>

      <th>{difference.toString().slice(0, 6)} %</th>

      <th>
        <button
          type="button"
          onClick={handleDeleteCoin}
          className={s.deleteButton}
        >
          <CloseSvg />
        </button>
      </th>
    </tr>
  );
};

const Cart: FC = (): JSX.Element => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
  const cartTotalNow = useSelector(
    (state: RootState) => state.cart.cartTotalNow
  );

  const c = cartItems.map((p) => (
    <CartRow name={p.name} amount={p.numberAmount} priceUsd={p.priceUsd} />
  ));

  return (
    <div>
      {cartItems.length !== 0 ? (
        <>
          <h1 className={s.header}>Portfolio.</h1>
          <table className={s.contentTable}>
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
              Initial Total:<b> {cartTotal}</b> $
            </p>
            <p>
              Total now:<b> {cartTotalNow}</b> $
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
