import classNames from 'classnames';
import { FC } from 'react';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import styles from '../common/table/Table.module.scss';

interface CartColorFieldProps {
  data: string | number;
  isRising: boolean;
  difference: number;
  label: string;
}

const CartColorField: FC<CartColorFieldProps> = ({
  data,
  isRising,
  difference,
  label,
}): JSX.Element => {
  return (
    <td data-label={label} className={styles.table__data}>
      <span
        className={classNames(
          isRising ? styles.arrow__green : styles.arrow__red,
          difference === 0 ? styles.arrow__black : ''
        )}
      >
        {toUSD(Number(data))}
      </span>
      {difference !== 0 ? (
        <span>
          <i
            className={classNames(
              styles.arrow,
              isRising ? styles.arrow__green : styles.arrow__red,
              difference === 0 ? styles.arrow__black : '',
              isRising ? styles.arrow__up : styles.arrow__down
            )}
          />
        </span>
      ) : (
        ''
      )}
    </td>
  );
};

export default CartColorField;
