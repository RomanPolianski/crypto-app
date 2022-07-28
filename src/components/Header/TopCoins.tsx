import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import s from './Header.module.scss';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import { RootState } from '../../store';
import Preloader from '../common/Preloader';

const TopCoins: FC = (): JSX.Element => {
  const topCoins = useSelector(
    (state: RootState) => state.currency.top3Currencies
  );
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {topCoins.length ? (
        <>
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
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default TopCoins;
