import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  deleteCartTotalNow,
  deleteFromCart,
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

      <td data-label="Difference">{difference.toFixed(2)} %</td>

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

export default CartRow;
