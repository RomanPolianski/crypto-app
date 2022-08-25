import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  deleteCartDifferenceInfo,
  fetchCurrencyPriceNow,
  setCartDifferenceInfo,
} from '../../store/cartSlice';
import Preloader from '../common/preloader/Preloader';
import { Table } from '../common/table/Table';
import styles from './Cart.module.scss';
import CartBottomInfo from './CartBottomInfo';
import CartDiagram from './CartDiagram';
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

  useEffect(() => {
    dispatch(
      setCartDifferenceInfo({ differenceCartTotal, differenceCartTotalPercent })
    );
    return () => {
      dispatch(deleteCartDifferenceInfo());
    };
  });

  const cartRow = cartItems.map((p) => (
    <CartRow
      name={p.name}
      amount={p.numberAmount}
      priceUsd={p.priceUsd}
      key={p.name}
    />
  ));

  return (
    <div>
      {cartItems.length !== 0 ? (
        <>
          <h1 className={styles.header}>Portfolio.</h1>
          <div className={styles.wrapper}>
            <Table
              headers={[
                'Coin',
                'Amount',
                'Price when added',
                'Price Now',
                'Total when added',
                'Total Now',
                'Difference',
                '',
              ]}
              data={cartRow}
              showBody={cartDataNow.length === cartTotalQuantity}
            />
            {cartDataNow.length === cartTotalQuantity ? (
              <CartBottomInfo
                cartTotal={cartTotal}
                cartTotalNow={cartTotalNow}
                differenceCartTotalPercent={differenceCartTotalPercent}
                differenceCartTotal={differenceCartTotal}
              />
            ) : (
              <Preloader />
            )}
            <CartDiagram />
          </div>
        </>
      ) : (
        <h1 className={styles.emptyText}>Your Portfolio is Empty!</h1>
      )}
    </div>
  );
};

export default Cart;
