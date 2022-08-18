import { useQuery } from '@apollo/client';
import { FC, useEffect, useState } from 'react';
import { ALL_COINS } from '../../apollo/queries';
import { CurType } from '../../store/cartSlice';
import Preloader from '../common/preloader/Preloader';
import { Table } from '../common/table/Table';
import styles from './Content.module.scss';
import CurrencyRow from './CurrencyRow/CurrencyRow';
import Pagination from './Pagination/Pagination';

const Content: FC = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currencyPerPage] = useState<number>(10);
  const offset = currentPage * 10 - 10;

  const [coins, setCoins] = useState<CurType[]>([]);
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    ALL_COINS,
    {
      variables: { offset: offset },
    }
  );

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
    if (!loading) {
      setCoins(data.getAllCoins);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    startPolling(10000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const totalCurrencies = 100;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCurrencies / currencyPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currencyRow = coins.map((p) => (
    <CurrencyRow
      id={p.id}
      key={p.id}
      rank={p.rank}
      symbol={p.symbol}
      name={p.name}
      supply={p.supply}
      maxSupply={p.maxSupply}
      marketCapUsd={p.marketCapUsd}
      volumeUsd24Hr={p.volumeUsd24Hr}
      priceUsd={p.priceUsd}
      changePercent24Hr={p.changePercent24Hr}
      vwap24Hr={p.vwap24Hr}
    />
  ));

  return (
    <div className={styles.table__wrapper}>
      {!coins.length ? (
        <Preloader />
      ) : (
        <>
          <Table
            headers={[
              'Rank',
              'Coin',
              'Price USD',
              'Martket Cap USD',
              'Change 24hr',
              '',
            ]}
            data={currencyRow}
            showBody
          />
          <div className={styles.table__buttonContainer}>
            <Pagination
              paginate={paginate}
              pageNumbers={pageNumbers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
