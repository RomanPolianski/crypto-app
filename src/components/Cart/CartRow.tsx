import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCartTotalNow, setCartTotalNow } from '../../store/cartSlice';
import useCalcPriceNow from '../../utils/calculation/useCalcPriceNow';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import CloseButton from '../common/buttons/close/CloseButton';
import DeleteConfirmModal from '../Modals/DeleteConfirmModal/DeleteConfirmModal';
import styles from '../common/table/Table.module.scss';
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
  };

  useEffect(() => {
    dispatch(setCartTotalNow(diffInfo.totalCoinPriceNow));
    return () => {
      dispatch(deleteCartTotalNow(diffInfo.totalCoinPriceNow));
    };
  }, [name]);

  return (
    <>
      <tr className={styles.table__row}>
        <td data-label="Coin" className={styles.table__data}>
          <b>{name}</b>
        </td>
        <td data-label="Amount" className={styles.table__data}>
          {amount}
        </td>
        <td data-label="Price when added" className={styles.table__data}>
          {toUSD(Number(priceUsd))}
        </td>
        <CartColorField
          data={diffInfo.priceNow}
          isRising={diffInfo.isRising}
          difference={diffInfo.difference}
          label="Price Now"
        />
        <td data-label="Total when added" className={styles.table__data}>
          {toUSD(amount * Number(priceUsd))}
        </td>
        <CartColorField
          data={diffInfo.totalCoinPriceNow}
          isRising={diffInfo.isRising}
          difference={diffInfo.difference}
          label="Total now"
        />

        <td data-label="Difference" className={styles.table__data}>
          {diffInfo.difference.toFixed(2)} %
        </td>

        <td data-label="" className={styles.table__data}>
          <CloseButton
            onclick={handleDeleteCoin}
            form="round"
            variant="delete"
          />
        </td>
      </tr>
      <DeleteConfirmModal
        open={open}
        close={toggle}
        name={name}
        priceNowUsd={Number(diffInfo.priceNow)}
      />
    </>
  );
};

export default CartRow;
