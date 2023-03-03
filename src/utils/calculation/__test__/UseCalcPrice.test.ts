import useCalcPriceNow from '../useCalcPriceNow';
import * as reactRedux from 'react-redux';
const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => mockSelector,
}));

const currencies = [
  {
    id: 'bitcoin',
    rank: '1',
    symbol: 'BTC',
    name: 'Bitcoin',
    supply: '19122156.0000000000000000',
    maxSupply: '21000000.0000000000000000',
    marketCapUsd: '461759528449.0359343707860520',
    volumeUsd24Hr: '14293380729.5947669245361178',
    priceUsd: '24147.8800010331436670',
    changePercent24Hr: '-1.5228356749275517',
    vwap24Hr: '24443.4547256997527405',
  },
];

describe('claca sprice test', () => {
  it('returns correct val', () => {
    mockSelector.mockReturnValue(currencies);
  });
});
