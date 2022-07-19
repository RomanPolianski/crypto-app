import classNames from 'classnames';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import PortfolioSvg from '../common/svg/PortfolioSvg';
import s from './Header.module.scss';
import Logo from '../../assets/logo.png';

const Header: FC = (): JSX.Element => {
  const topCoins = useSelector((state: RootState) =>
    state.currency.currencies.slice(0, 3)
  );

  const totalCartItemsAmount = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity
  );

  const navigate = useNavigate();

  return (
    <header className={s.header}>
      <div className={s.headerInnerContainer}>
        <img src={Logo} alt="logo" className={s.logo} />
        <h1 className={s.appName}>CRYPTO</h1>
        {topCoins.map((c) => {
          return (
            <div key={c.name} className={s.topCoinWrapper}>
              <div className={s.topCopinsContainer}>
                <p className={s.textCoin}>{c.name}</p>
                <p className={s.textCoin}>{c.priceUsd.slice(0, 7)}</p>
              </div>
              <i
                className={classNames(
                  s.arrow,
                  Number(c.changePercent24Hr) < 0 ? s.down : s.up
                )}
              />
            </div>
          );
        })}
        <button
          type="button"
          className={s.cartButton}
          onClick={() => navigate('/cart')}
        >
          <PortfolioSvg />
        </button>
        <p className={s.coinNumberInCart}>{totalCartItemsAmount}</p>
      </div>
    </header>
  );
};

export default Header;
