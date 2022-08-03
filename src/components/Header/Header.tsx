import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import styles from './Header.module.scss';
import { fetchTop3Currencies } from '../../store/currencySlice';
import Logo from './Logo';
import TopCoins from './TopCoins';
import CartStatusInfo from './CartStatusInfo';
import CartIcon from './CartIcon';

const Header: FC = (): JSX.Element => {
  const totalCartItemsAmount = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity
  );

  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const isCartPage = location.pathname.includes('cart');

  useEffect(() => {
    dispatch(fetchTop3Currencies());
  }, [totalCartItemsAmount, isCartPage]);

  return (
    <header className={styles.header}>
      <div className={styles.header__body}>
        <div className={styles.header__left}>
          <Logo />
          <TopCoins />
        </div>
        <div className={styles.header__cart}>
          <CartStatusInfo />
          <CartIcon
            totalCartItemsAmount={totalCartItemsAmount}
            isCartPage={isCartPage}
          />
        </div>
      </div>
    </header>
  );
};
export default Header;
