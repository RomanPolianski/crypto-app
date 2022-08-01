import classNames from 'classnames';
import { FC } from 'react';
import { toUSD } from '../../utils/formatters/toUSDformatter';
import s from './Cart.module.scss';

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
    <td data-label={label} className={s.table__data}>
      <span
        className={classNames(
          isRising ? s.arrow__green : s.arrow__red,
          difference === 0 ? s.black : ''
        )}
      >
        {toUSD.format(Number(data))}
      </span>
      {difference !== 0 ? (
        <span>
          <i
            className={classNames(
              s.arrow,
              isRising ? s.arrow__green : s.arrow__red,
              difference === 0 ? s.arrow__black : '',
              isRising ? s.arrow__up : s.arrow__down
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
