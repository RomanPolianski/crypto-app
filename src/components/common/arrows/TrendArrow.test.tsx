import { render } from '../../../../test-utils';
import { TrendArrow } from './TrendArrow';

describe('TrendArrow test', () => {
  it('TrendArrow snapshot down red', () => {
    const arrow = render(<TrendArrow isRising difference={-21} />);
    expect(arrow).toMatchSnapshot();
  });

  it('TrendArrow snapshot up green', () => {
    const arrow = render(<TrendArrow isRising difference={31} />);
    expect(arrow).toMatchSnapshot();
  });
});
