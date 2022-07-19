import classNames from 'classnames';
import { FC, useState } from 'react';
import CartSvg from '../../common/svg/CartSvg';
import BuyCurrencyModal from '../../Modals/BuyCurrencyModal/BuyCurrencyModal';
import InfoModal from '../../Modals/InfoModal/InfoModal';
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
  const [infoModalOpen, setInfoModalOpen] = useState<boolean>(false);

  const toggle = () => setOpen(!open);
  const toggleInfoModal = () => setInfoModalOpen(!infoModalOpen);

  const handleCartClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setInfoModalOpen(false);
    setOpen(true);
  };

  const handleInfoModalClick = () => {
    setInfoModalOpen(true);
  };

  return (
    <>
      <tr onClick={() => handleInfoModalClick()}>
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
            onClick={(e) => handleCartClick(e)}
          >
            <CartSvg />
          </button>
        </th>
      </tr>
      {(infoModalOpen || open) && (
        <>
          <BuyCurrencyModal
            open={open}
            close={toggle}
            name={name}
            priceUsd={priceUsd}
          />
          <InfoModal
            open={infoModalOpen}
            close={toggleInfoModal}
            name={name}
            supply={supply}
            maxSupply={maxSupply}
            volumeUsd24Hr={volumeUsd24Hr}
            vwap24Hr={vwap24Hr}
            priceUsd={priceUsd}
          />
        </>
      )}
    </>
  );
};

export default CurrencyRow;
