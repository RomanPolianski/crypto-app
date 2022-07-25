import classNames from 'classnames';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import PortfolioSvg from '../common/svg/PortfolioSvg';
import s from './Header.module.scss';
import Logo from '../../assets/logo.png';
import { toUSD } from '../../utils/formatters/toUSDformatter';

const Header: FC = (): JSX.Element => {
  const topCoins = useSelector((state: RootState) =>
    state.currency.currencies.slice(0, 3)
  );
  const totalCartItemsAmount = useSelector(
    (state: RootState) => state.cart.cartTotalQuantity
  );
  const totalCartDifference = useSelector(
    (state: RootState) => state.cart.prevDifferenceCartTotal
  );
  const totalCartDifferencePercent = useSelector(
    (state: RootState) => state.cart.prevDifferenceCartTotalPercent
  );
  const cartTotalNow = useSelector(
    (state: RootState) => state.cart.histCartTotal[0]
  );

  const navigate = useNavigate();

  return (
    <header className={s.header}>
      <div className={s.headerInnerContainer}>
        <div className={s.headerLeft}>
          <img src={Logo} alt="logo" className={s.logo} />
          <h1 className={s.appName}>CRYPTO</h1>
          {topCoins.map((c) => {
            return (
              <div key={c.name} className={s.topCoinWrapper}>
                <div className={s.topCoinContainer}>
                  <p className={s.textCoin}>{c.name}</p>
                  <p className={s.textCoin}>
                    {toUSD.format(Number(c.priceUsd))}
                  </p>
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
        </div>

        <div className={s.cart}>
          <p className={s.cartStatusWrapper}>
            <span>{toUSD.format(cartTotalNow)}</span>
            <span className={s.cartStatusText}>
              USD {totalCartDifference.toFixed(2)}{' '}
              <span>
                {cartTotalNow
                  ? `(${totalCartDifferencePercent.toFixed(2)}%)`
                  : ''}
              </span>
            </span>
          </p>
          <span className={s.cartIconWrapper}>
            <button
              type="button"
              className={s.cartButton}
              onClick={() => navigate('/cart')}
            >
              <PortfolioSvg />
            </button>
            <p className={s.coinNumberInCart}>{totalCartItemsAmount}</p>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
