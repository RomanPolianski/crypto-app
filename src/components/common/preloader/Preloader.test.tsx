import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '../../../../test-utils';
import Preloader from './Preloader';

describe('Preloader test', () => {
  it('is test preloader visible', () => {
    render(<Preloader />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('Preloader snapshot', () => {
    const preloader = render(<Preloader />);
    expect(preloader).toMatchSnapshot();
  });
});
