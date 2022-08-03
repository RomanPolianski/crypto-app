import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  deleteCartDifferenceInfo,
  fetchCurrencyPriceNow,
  setCartDifferenceInfo,
} from '../../store/cartSlice';
import Preloader from '../common/Preloader';
import styles from './Cart.module.scss';
import CartBottomInfo from './CartBottomInfo';
import CartRow from './CartRow';

const Cart: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const cartTotal = useSelector((state: RootState) => state.cart.cartTotal);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const cartTotalQuantity = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity
  );

  const cartItemNames: Array<string> = [];
  cartItems.forEach((i) => cartItemNames.push(i.id));
  const coinsToFetch = cartItemNames
    .toString()
    .toLowerCase()
    .replaceAll(/ /g, '-');

  useEffect(() => {
    if (cartItems.length !== 0) {
      dispatch(fetchCurrencyPriceNow(coinsToFetch));
    }
  }, []);

  const cartTotalNow = useSelector(
    (state: RootState) => state.cart.cartTotalNow
  );
  const cartDataNow = useSelector(
    (state: RootState) => state.cart.currentCartCoinsData
  );
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
          <h1 className={styles.header}>Portfolio.</h1>
          <table className={styles.table}>
            <thead className={styles.table__header}>
              <tr className={styles.table__row}>
                <th className={styles.table__header__item}>Coin</th>
                <th className={styles.table__header__item}>Amount</th>
                <th className={styles.table__header__item}>Price when added</th>
                <th className={styles.table__header__item}>Price Now</th>
                <th className={styles.table__header__item}>Total when added</th>
                <th className={styles.table__header__item}>Total Now</th>
                <th className={styles.table__header__item}>Difference</th>
                <th className={styles.table__header__item}> </th>
              </tr>
            </thead>
            {cartDataNow.length === cartTotalQuantity ? (
              <>
                <tbody className={styles.table__body}>{c}</tbody>
                <CartBottomInfo
                  cartTotal={cartTotal}
                  cartTotalNow={cartTotalNow}
                  differenceCartTotalPercent={differenceCartTotalPercent}
                  differenceCartTotal={differenceCartTotal}
                />
              </>
            ) : (
              <Preloader />
            )}
          </table>
        </>
      ) : (
        <h1 className={styles.emptyText}>Your Portfolio is Empty!</h1>
      )}
    </div>
  );
};

export default Cart;
