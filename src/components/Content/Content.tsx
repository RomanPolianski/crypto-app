import { FC } from 'react';
import s from './Content.module.scss';
import CurrencyRow from './CurrencyRow/CurrencyRow';

const testData = {
  data: [
    {
      id: 'bitcoin',
      rank: '1',
      symbol: 'BTC',
      name: 'Bitcoin',
      supply: '17193925.00',
      maxSupply: '21000000.00',
      marketCapUsd: '119150835874.46',
      volumeUsd24Hr: '2927959461.17',
      priceUsd: '6929.82',
      changePercent24Hr: '-0.8101417214350335',
      vwap24Hr: '7175.06',
    },
    {
      id: 'ethereum',
      rank: '2',
      symbol: 'ETH',
      name: 'Ethereum',
      supply: '101160540.00',
      maxSupply: null,
      marketCapUsd: '40967739219.66',
      volumeUsd24Hr: '1026669440.64',
      priceUsd: '404.97',
      changePercent24Hr: '-0.0999626159535347',
      vwap24Hr: '415.32',
    },
  ],
};

const c = testData.data.map((p) => (
  <CurrencyRow
    key={p.id}
    cryptoId={p.rank}
    symbol={p.symbol}
    name={p.name}
    supply={p.supply}
    maxSupply={p.maxSupply}
    marketCapUsd={p.marketCapUsd}
    volumeUsd24Hr={p.volumeUsd24Hr}
    priceUsd={p.priceUsd}
    changePercent24Hr={p.changePercent24Hr.slice(0, 5)}
    vwap24Hr={p.vwap24Hr}
  />
));

const Content: FC = (): JSX.Element => {
  return (
    <table className={s.contentTable}>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Symbol</th>
          <th>Name</th>
          <th>Supply</th>
          <th>MaxSupply</th>
          <th>MarketCap USD</th>
          <th>24hr volume USD</th>
          <th>Price USD</th>
          <th>Change % 24Hr</th>
          <th>Vol.Weighted Average Price</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>{c}</tbody>
    </table>
  );
};

export default Content;
