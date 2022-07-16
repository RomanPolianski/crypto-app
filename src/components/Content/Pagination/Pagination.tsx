import classNames from 'classnames';
import { FC } from 'react';
import s from './Pagination.module.scss';

interface PaginationPropsTypes {
  paginate: Function;
  pageNumbers: Array<number>;
  currentPage: number;
}

const Pagination: FC<PaginationPropsTypes> = ({
  paginate,
  pageNumbers,
  currentPage,
}) => {
  return (
    <div className={s.paginationContainer}>
      {pageNumbers.map((number) => (
        <li
          key={number}
          className={classNames(number === currentPage ? s.currentPage : '')}
        >
          <a
            href="!#"
            className={classNames(number === currentPage ? s.currentPage : '')}
            onClick={() => paginate(number)}
          >
            {number}
          </a>
        </li>
      ))}
    </div>
  );
};

export default Pagination;
