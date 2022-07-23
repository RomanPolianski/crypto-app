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
    <td data-label={label}>
      <span
        className={classNames(
          isRising ? s.green : s.red,
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
              isRising ? s.green : s.red,
              difference === 0 ? s.black : '',
              isRising ? s.up : s.down
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
