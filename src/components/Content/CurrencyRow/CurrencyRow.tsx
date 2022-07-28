import classNames from 'classnames';
import { FC, useState } from 'react';
import { toUSD } from '../../../utils/formatters/toUSDformatter';
import CartSvg from '../../common/svg/CartSvg';
import BuyCurrencyModal from '../../Modals/BuyCurrencyModal/DeleteConfirmatio/BuyCurrencyModal';
import InfoModal from '../../Modals/InfoModal/InfoModal';
import s from '../Content.module.scss';

interface ICurrencyRowProps {
  id: string;
  key: string;
  rank: string;
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
  id,
  rank,
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
        <td data-label="Rank">{rank}</td>
        <td data-label="Coin">
          <b>{symbol}</b>
          <br />
          {name}
        </td>
        <td data-label="Price USD">{toUSD.format(Number(priceUsd))}</td>
        <td data-label="MarketCap USD">{toUSD.format(Number(marketCapUsd))}</td>
        <td
          data-label="Change % 24hr"
          className={classNames(
            Number(changePercent24Hr) > 0 ? s.green : s.red
          )}
        >
          {Number(changePercent24Hr).toFixed(2)}
          <i
            className={classNames(
              s.arrow,
              Number(changePercent24Hr) < 0 ? s.down : s.up
            )}
          />
        </td>
        <td data-label="">
          <button
            type="button"
            className={s.addToCartButton}
            onClick={(e) => handleCartClick(e)}
          >
            <CartSvg />
          </button>
        </td>
      </tr>
      {(infoModalOpen || open) && (
        <>
          <BuyCurrencyModal
            id={id}
            open={open}
            close={toggle}
            name={name}
            priceUsd={priceUsd}
          />
          <InfoModal
            id={id}
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
