import classNames from 'classnames';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  deleteCartTotalNow,
  deleteFromCart,
  setCartTotalNow,
} from '../../store/cartSlice';
import useCalcPriceNow from '../../utils/calculation/useCalcPriceNow';
import { toPercent } from '../../utils/formatters/toPercentFormatter';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import CloseSvg from '../common/svg/CloseSvg';
import s from './Cart.module.scss';

interface CartRowProps {
  name: string;
  amount: number;
  priceUsd: string;
}
const CartRow: FC<CartRowProps> = ({ name, amount, priceUsd }): JSX.Element => {
  const dispatch = useDispatch();
  const diffInfo = useCalcPriceNow(amount, priceUsd, name);

  const handleDeleteCoin = () => {
    dispatch(deleteFromCart(name));
  };

  useEffect(() => {
    dispatch(setCartTotalNow(diffInfo.totalCoinPriceNow));
    return () => {
      dispatch(deleteCartTotalNow());
    };
  }, [name]);

  return (
    <tr>
      <td data-label="Coin">{name}</td>
      <td data-label="Amount">{amount}</td>
      <td data-label="Price when added">{toUSD.format(Number(priceUsd))}</td>
      <td data-label="Price now">
        <span className={classNames(diffInfo.isRising ? s.green : s.red)}>
          {toUSD.format(Number(diffInfo.priceNow))}
        </span>
        <span>
          <i
            className={classNames(s.arrow, diffInfo.isRising ? s.up : s.down)}
          />
        </span>
      </td>
      <td data-label="Total when added">
        {toUSD.format(amount * Number(priceUsd))} $
      </td>
      <td data-label="Total now">
        <span className={classNames(diffInfo.isRising ? s.green : s.red)}>
          {toUSD.format(diffInfo.totalCoinPriceNow)}
        </span>
        <span>
          <i className={classNames(diffInfo.isRising ? s.green : s.red)} />
        </span>
      </td>

      <td data-label="Difference">{toPercent.format(diffInfo.difference)}</td>

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
