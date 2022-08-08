import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { NextPrevButton } from '../common/buttons/nextPrevButton/NextPrevButton';
import ButtonPrevSvg from '../common/svg/ButtonPrevSvg';
import PortfolioSvg from '../common/svg/PortfolioSvg';
import styles from './Header.module.scss';

interface CartIconProps {
  totalCartItemsAmount: number;
  isCartPage: boolean;
}

const CartIcon: FC<CartIconProps> = ({
  totalCartItemsAmount,
  isCartPage,
}): JSX.Element => {
  const navigate = useNavigate();

  return (
    <span className={styles.cartIcon}>
      {!isCartPage ? (
        <>
          <button
            type="button"
            className={styles.cartIcon__button}
            disabled={isCartPage}
            onClick={() => navigate('/cart')}
          >
            <PortfolioSvg />
          </button>
          <p className={styles.cartIcon__amount}>{totalCartItemsAmount}</p>
        </>
      ) : (
        <NextPrevButton
          type="prev"
          onclick={() => navigate('/crypto-app')}
          color="white"
        />
      )}
    </span>
  );
};

export default CartIcon;
