import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import styles from './Header.module.scss';
import Logo from './Logo';
import TopCoins from './TopCoins';
import CartStatusInfo from './CartStatusInfo';
import CartIcon from './CartIcon';

const Header: FC = (): JSX.Element => {
  const totalCartItemsAmount = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity
  );

  const location = useLocation();
  const isCartPage = location.pathname.includes('cart');

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
