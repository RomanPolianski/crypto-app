/* eslint-disable no-plusplus */
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { CurType, fetchCurrencies } from '../../store/currencySlice';
import s from './Content.module.scss';
import CurrencyRow from './CurrencyRow/CurrencyRow';
import Pagination from './Pagination/Pagination';

const Content: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currencyPerPage] = useState<number>(10);
  const lastCurrencyIndex = currentPage * currencyPerPage;
  const firstCurrencyIndex = lastCurrencyIndex - currencyPerPage;

  useEffect(() => {
    dispatch(fetchCurrencies());
  }, []);

  const currenciesData: CurType[] = useSelector(
    (state: RootState) => state.currency.currencies
  );

  const currentCurrency = currenciesData.slice(
    firstCurrencyIndex,
    lastCurrencyIndex
  );
  const totalCurrencies = currenciesData.length;

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCurrencies / currencyPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage !== pageNumbers.length) setCurrentPage((prev) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
  };

  const c = currentCurrency.map((p: any) => (
    <CurrencyRow
      key={p.id}
      cryptoId={p.rank}
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
    <>
      <table className={s.contentTable}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Supply</th>
            <th>MaxSupply</th>
            <th>MarketCap USD</th>
            <th>24hr volume USD</th>
            <th>Price USD</th>
            <th>Change % 24Hr</th>
            <th>Vol.Weighted Average Price</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{c}</tbody>
      </table>

      <div className={s.buttonContainer}>
        <button type="button" className={s.nextprevButton} onClick={prevPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            {' '}
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
            />{' '}
          </svg>
        </button>
        <button type="button" className={s.nextprevButton} onClick={nextPage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-arrow-right-circle"
            viewBox="0 0 16 16"
          >
            {' '}
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            />{' '}
          </svg>
        </button>
        <Pagination
          paginate={paginate}
          pageNumbers={pageNumbers}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Content;
