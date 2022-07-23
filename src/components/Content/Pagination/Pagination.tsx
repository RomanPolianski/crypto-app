import classNames from 'classnames';
import { FC } from 'react';
import ButtonNextSvg from '../../common/svg/ButtonNextSvg';
import ButtonPrevSvg from '../../common/svg/ButtonPrevSvg';
import s from './Pagination.module.scss';

interface PaginationPropsTypes {
  paginate: Function;
  pageNumbers: Array<number>;
  currentPage: number;
  setCurrentPage: Function;
}

const Pagination: FC<PaginationPropsTypes> = ({
  paginate,
  pageNumbers,
  currentPage,
  setCurrentPage,
}): JSX.Element => {
  const nextPage = () => {
    if (currentPage !== pageNumbers.length)
      setCurrentPage((prev: number) => prev + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage((prev: number) => prev - 1);
  };

  return (
    <>
      <button
        type="button"
        className={s.nextprevButton}
        onClick={prevPage}
        disabled={currentPage === pageNumbers[0]}
      >
        <ButtonPrevSvg />
      </button>

      <button
        type="button"
        className={s.nextprevButton}
        onClick={nextPage}
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
      >
        <ButtonNextSvg />
      </button>
      <div className={s.paginationContainer}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={classNames(number === currentPage ? s.currentPage : '')}
          >
            <a
              href="#"
              className={classNames(
                number === currentPage ? s.currentPage : ''
              )}
              onClick={() => paginate(number)}
            >
              {number}
            </a>
          </li>
        ))}
      </div>
    </>
  );
};

export default Pagination;
