import { render, screen, userEvent } from '../../../../../test-utils';
import CloseButton from './CloseButton';

const onclick = jest.fn();

describe('Close btn test', () => {
  it('is button round delete visible', () => {
    const closebtn = render(
      <CloseButton form="round" variant="delete" onclick={onclick} />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('is button square close visible', () => {
    const closebtn = render(
      <CloseButton form="square" variant="close" onclick={onclick} />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('Snapshot button round delete', () => {
    const closeBtn = render(
      <CloseButton form="round" variant="delete" onclick={onclick} />
    );
    expect(closeBtn).toMatchSnapshot();
  });

  it('Snapshot button square close', () => {
    const closeBtn = render(
      <CloseButton form="round" variant="delete" onclick={onclick} />
    );
    expect(closeBtn).toMatchSnapshot();
  });
});
