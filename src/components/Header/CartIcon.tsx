import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ButtonPrevSvg from '../common/svg/ButtonPrevSvg';
import PortfolioSvg from '../common/svg/PortfolioSvg';
import s from './Header.module.scss';

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
    <span className={s.cartIcon}>
      {!isCartPage ? (
        <>
          <button
            type="button"
            className={s.cartIcon__button}
            disabled={isCartPage}
            onClick={() => navigate('/cart')}
          >
            <PortfolioSvg />
          </button>
          <p className={s.cartIcon__amount}>{totalCartItemsAmount}</p>
        </>
      ) : (
        <button
          type="button"
          onClick={() => navigate('/crypto-app')}
          className={s.cartIcon__backButton}
        >
          <ButtonPrevSvg />
        </button>
      )}
    </span>
  );
};

export default CartIcon;
