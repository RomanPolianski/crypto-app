/* eslint-disable no-plusplus */
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { CurType, fetchCurrencies } from '../../store/currencySlice';
import Preloader from '../common/Preloader';
import ButtonNextSvg from '../common/svg/ButtonNextSvg';
import ButtonPrevSvg from '../common/svg/ButtonPrevSvg';
import s from './Content.module.scss';
import CurrencyRow from './CurrencyRow/CurrencyRow';
import Pagination from './Pagination/Pagination';

const Content: FC = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currencyPerPage] = useState<number>(10);
  const lastCurrencyIndex = currentPage * currencyPerPage;
  const firstCurrencyIndex = lastCurrencyIndex - currencyPerPage;

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCurrencies());
    setIsLoading(false);
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

  const c = currentCurrency.map((p) => (
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
    <div>
      {isLoading ? (
        <Preloader />
      ) : (
        <>
          <table className={s.contentTable}>
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
            <button
              type="button"
              className={s.nextprevButton}
              onClick={prevPage}
            >
              <ButtonPrevSvg />
            </button>
            <button
              type="button"
              className={s.nextprevButton}
              onClick={nextPage}
            >
              <ButtonNextSvg />
            </button>
            <Pagination
              paginate={paginate}
              pageNumbers={pageNumbers}
              currentPage={currentPage}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Content;
