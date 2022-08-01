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
              <div key={c.name} className={s.header__topCoins}>
                <div className={s.topCoins__body}>
                  <p className={s.topCoins__text}>{c.name}</p>
                  <p className={s.topCoins__text}>
                    {toUSD.format(Number(c.priceUsd))}
                  </p>
                </div>
                <i
                  className={classNames(
                    s.topCoins__arrow,
                    Number(c.changePercent24Hr) < 0
                      ? s.topCoins__arrow_down
                      : s.topCoins__arrow_up
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
