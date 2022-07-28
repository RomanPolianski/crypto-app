import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { CurType, fetchCurrencies } from '../../store/currencySlice';
import Preloader from '../common/Preloader';
import s from './Content.module.scss';
import CurrencyRow from './CurrencyRow/CurrencyRow';
import Pagination from './Pagination/Pagination';

const Content: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currencyPerPage] = useState<number>(10);
  const offset = currentPage * 10 - 10;

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrencies(offset));
    setIsLoading(false);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [currentPage]);

  const currenciesData: CurType[] = useSelector(
    (state: RootState) => state.currency.currencies
  );

  const totalCurrencies = 100;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCurrencies / currencyPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const c = currenciesData.map((p) => (
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
    <div className={s.wrapper}>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <table className={s.table}>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Coin</th>
                <th>Price USD</th>
                <th>MarketCap USD</th>
                <th>Change 24Hr</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{c}</tbody>
          </table>
          <div className={s.buttonContainer}>
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
