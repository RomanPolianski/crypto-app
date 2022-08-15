import { jest } from '@jest/globals';
import useCalcPriceNow from './useCalcPriceNow';
import * as reduxHooks from 'react-redux';

const data = [
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

describe('clacaa sprice test', () => {
  it('returns correct val', () => {
    jest.spyOn(reduxHooks, 'useSelector').mockReturnValue([data]);
    expect(useCalcPriceNow(12, '12', 'hi')).toEqual('US$12.00');
  });
});
