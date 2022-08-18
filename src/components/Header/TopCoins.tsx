import { FC, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import Preloader from '../common/preloader/Preloader';
import { TrendArrow } from '../common/arrows/TrendArrow';
import { useQuery } from '@apollo/client';
import { TOP3_COINS } from '../../apollo/queries';
import { CurType } from '../../store/cartSlice';

const TopCoins: FC = (): JSX.Element => {
  const [loadingPage, setIsLoading] = useState<boolean>(true);
  const [topCoins, setTopCoins] = useState<CurType[]>([]);
  const { loading, error, data, startPolling, stopPolling } =
    useQuery(TOP3_COINS);
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
    if (!loading) {
      setTopCoins(data.getTop3Coins);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    startPolling(10000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (error) {
    return <h2>Error</h2>;
  }
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
