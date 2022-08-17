import { fireEvent, render, screen } from '../../../../../test-utils';
import { NextPrevButton } from './NextPrevButton';

const onclick = () => {};

describe('Close btn test', () => {
  it('is round delete visible & disabled', () => {
    const NextPrevbtn = render(
      <NextPrevButton
        color="black"
        type="prev"
        disabled={false}
        onclick={onclick}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('is button square close visible', () => {
    const NextPrevbtn = render(
      <NextPrevButton color="white" type="prev" disabled onclick={onclick} />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('is button clickable', () => {
    const NextPrevbtn = render(
      <NextPrevButton color="white" type="prev" disabled onclick={onclick} />
    );

    const btn = screen.getByRole('button');
    fireEvent.click(btn);
  });

  it('Snapshot button round delete', () => {
    const NextPrevbtn = render(
      <NextPrevButton color="black" type="prev" disabled onclick={onclick} />
    );
    expect(NextPrevbtn).toMatchSnapshot();
  });

  it('Snapshot button square close', () => {
    const NextPrevbtn = render(
      <NextPrevButton color="white" type="prev" disabled onclick={onclick} />
    );
    expect(NextPrevbtn).toMatchSnapshot();
  });
});
