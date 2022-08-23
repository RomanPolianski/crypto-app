import { toUSD } from './toUSDformatter';

describe('toUSD test', () => {
  it('returns correct val', () => {
    expect(toUSD(12)).toEqual('US$12.00');
  });
  it('returns val', () => {
    expect(toUSD(0.12)).toEqual('US$0.12');
  });
  it('returns val', () => {
    expect(toUSD(0.001)).toEqual('US$0.001000');
  });
  it('returns val', () => {
    expect(toUSD(0.000011)).toEqual('US$0.000011');
  });
});
