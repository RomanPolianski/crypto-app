import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  deleteCartDifferenceInfo,
  setCartDifferenceInfo,
} from '../../store/cartSlice';
import s from './Cart.module.scss';
import CartBottomInfo from './CartBottomInfo';
import CartRow from './CartRow';

const Cart: FC = (): JSX.Element => {
  const dispatch = useDispatch();
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
  const cartTotalNow = useSelector(
    (state: RootState) => state.cart.cartTotalNow
  );
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
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
            <CartBottomInfo
              cartTotal={cartTotal}
              cartTotalNow={cartTotalNow}
              differenceCartTotalPercent={differenceCartTotalPercent}
              differenceCartTotal={differenceCartTotal}
            />
          </table>
        </>
      ) : (
        <h1 className={s.emptyCartText}>Your Portfolio is Empty!</h1>
      )}
    </div>
  );
};

export default Cart;
