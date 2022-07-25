import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  deleteCartTotalNow,
  deleteFromCart,
  setCartTotalNow,
} from '../../store/cartSlice';
import useCalcPriceNow from '../../utils/calculation/useCalcPriceNow';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import CloseSvg from '../common/svg/CloseSvg';
import DeleteConfirmModal from '../Modals/DeleteConfirmModal/DeleteConfirmModal';
import s from './Cart.module.scss';
import CartColorField from './CartColorField';

interface CartRowProps {
  name: string;
  amount: number;
  priceUsd: string;
}
const CartRow: FC<CartRowProps> = ({ name, amount, priceUsd }): JSX.Element => {
  const dispatch = useDispatch();
  const diffInfo = useCalcPriceNow(amount, priceUsd, name);
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);

  const handleDeleteCoin = () => {
    toggle();
    // dispatch(deleteFromCart(name));
  };

  useEffect(() => {
    dispatch(setCartTotalNow(diffInfo.totalCoinPriceNow));
    return () => {
      dispatch(deleteCartTotalNow());
    };
  }, [name]);

  return (
    <>
      <tr>
        <td data-label="Coin">
          <b>{name}</b>
        </td>
        <td data-label="Amount">{amount}</td>
        <td data-label="Price when added">{toUSD.format(Number(priceUsd))}</td>
        <CartColorField
          data={diffInfo.priceNow}
          isRising={diffInfo.isRising}
          difference={diffInfo.difference}
          label="Price Now"
        />
        <td data-label="Total when added">
          {toUSD.format(amount * Number(priceUsd))}
        </td>
        <CartColorField
          data={diffInfo.totalCoinPriceNow}
          isRising={diffInfo.isRising}
          difference={diffInfo.difference}
          label="Total now"
        />

        <td data-label="Difference">{diffInfo.difference.toFixed(2)} %</td>

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
      <DeleteConfirmModal open={open} close={toggle} name={name} />
    </>
  );
};

export default CartRow;
