/* eslint-disable react/require-default-props */
import { FC } from 'react';
import styles from './Table.module.scss';

interface TableProps {
  headers: Array<string>;
  data?: JSX.Element[];
  showBody: boolean;
}

export const Table: FC<TableProps> = ({
  headers,
  data,
  showBody,
}): JSX.Element => {
  return (
    <table className={styles.table}>
      <thead className={styles.table__header}>
        <tr className={styles.table__row}>
          {headers.map((i) => {
            return (
              <th className={styles.table__header__item} key={i}>
                {i}
              </th>
            );
          })}
        </tr>
      </thead>
      {showBody && <tbody className={styles.table__body}>{data}</tbody>}
    </table>
  );
};
