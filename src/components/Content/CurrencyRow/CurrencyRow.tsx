import classNames from 'classnames';
import { FC, useState } from 'react';
import BuyCurrencyModal from '../../Modals/BuyCurrencyModal/BuyCurrencyModal';
import s from '../Content.module.scss';

interface ICurrencyRowProps {
  key: string;
  cryptoId: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

const CurrencyRow: FC<ICurrencyRowProps> = ({
  cryptoId,
  symbol,
  name,
  supply,
  maxSupply,
  marketCapUsd,
  volumeUsd24Hr,
  priceUsd,
  changePercent24Hr,
  vwap24Hr,
}): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const toggle = () => setOpen(!open);

  const handleCartClick = () => {
    setOpen(true);
  };

  return (
    <>
      <tr>
        <th>{cryptoId}</th>
        <th>
          <b>{symbol}</b>
          <br />
          {name}
        </th>
        <th>{priceUsd.slice(0, 7)} $</th>
        <th>{marketCapUsd.slice(0, 15)} $</th>
        <th
          className={classNames(
            Number(changePercent24Hr) > 0 ? s.green : s.red
          )}
        >
          {changePercent24Hr.slice(0, 5)} %
        </th>
        <th>
          <button
            type="button"
            className={s.addToCartButton}
            onClick={() => handleCartClick()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="21"
              fill="currentColor"
              className="bi bi-cart"
              viewBox="0 0 16 16"
            >
              {' '}
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />{' '}
            </svg>
          </button>
        </th>
      </tr>
      <BuyCurrencyModal open={open} close={toggle} name={name} />
    </>
  );
};

export default CurrencyRow;
