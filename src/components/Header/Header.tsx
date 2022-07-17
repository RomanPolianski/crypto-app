import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import s from './Header.module.scss';

const Header: FC = (): JSX.Element => {
  const topCoins = useSelector((state: RootState) =>
    state.currency.currencies.slice(0, 3)
  );

  const navigate = useNavigate();

  return (
    <header className={s.header}>
      <div className={s.headerInnerContainer}>
        <img
          src="https://seeklogo.com/images/P/polygon-matic-logo-86F4D6D773-seeklogo.com.png"
          alt="logo"
          className={s.logo}
        />
        <h1 className={s.appName}>CRYPTO</h1>
        {topCoins.map((c) => {
          return (
            <div className={s.topCopinsContainer}>
              <p className={s.textCoin}>{c.name}</p>
              <p className={s.textCoin}>{c.priceUsd.slice(0, 7)} $</p>
            </div>
          );
        })}
        <button
          type="button"
          className={s.cartButton}
          onClick={() => navigate('/cart')}
        >
          <svg
            style={{ color: 'white' }}
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-bag"
            viewBox="0 0 16 16"
          >
            {' '}
            <path
              d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
              fill="white"
            />{' '}
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
