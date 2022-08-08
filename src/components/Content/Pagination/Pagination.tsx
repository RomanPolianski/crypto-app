import classNames from 'classnames';
import { FC } from 'react';
import { NextPrevButton } from '../../common/buttons/nextPrevButton/NextPrevButton';
import styles from './Pagination.module.scss';

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
      <NextPrevButton
        type="prev"
        disabled={currentPage === pageNumbers[0]}
        onclick={prevPage}
        color="black"
      />
      <NextPrevButton
        type="next"
        disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
        onclick={nextPage}
        color="black"
      />
      <div className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={classNames(
              styles.pagination__button,
              number === currentPage ? styles.currentPage : ''
            )}
          >
            <a
              href="#"
              className={classNames(
                styles.pagination__link,
                number === currentPage ? styles.currentPage : ''
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
