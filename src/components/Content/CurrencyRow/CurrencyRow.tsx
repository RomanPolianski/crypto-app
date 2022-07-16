import { FC } from 'react';

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
  key,
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
  return (
    <tr>
      <th>{cryptoId}</th>
      <th>{symbol}</th>
      <th>{name}</th>
      <th>{supply}</th>
      <th>{maxSupply}</th>
      <th>{marketCapUsd}</th>
      <th>{volumeUsd24Hr}</th>
      <th>{priceUsd}</th>
      <th>{changePercent24Hr}</th>
      <th>{vwap24Hr}</th>
    </tr>
  );
};

export default CurrencyRow;
