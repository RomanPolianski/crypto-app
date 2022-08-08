import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { FC } from 'react';
import styles from './Header.module.scss';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import { RootState } from '../../store';
import Preloader from '../common/preloader/Preloader';
import { TrendArrow } from '../common/arrows/TrendArrow';

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
              <div key={c.name} className={styles.header__topCoins}>
                <div className={styles.topCoins__body}>
                  <p className={styles.topCoins__text}>{c.name}</p>
                  <p className={styles.topCoins__text}>
                    {toUSD(Number(c.priceUsd))}
                  </p>
                </div>
                <span className={styles.topCoins__arrow}>
                  <TrendArrow isRising={Number(c.changePercent24Hr) > 0} />
                </span>
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
