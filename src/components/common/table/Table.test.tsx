import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '../../../../test-utils';
import { Table } from './Table';

describe('Table test', () => {
  it('is table visible', () => {
    render(
      <Table
        headers={[
          'Rank',
          'Coin',
          'Price USD',
          'Martket Cap USD',
          'Change 24hr',
          '',
        ]}
        showBody
      />
    );
    expect(screen.getByRole('table')).toBeInTheDocument();
    const welcomeText = screen.getByText(/Rank/i);
    expect(welcomeText).toBeInTheDocument();
  });

  it('Table snapshot', () => {
    const table = render(
      <Table
        headers={[
          'Rank',
          'Coin',
          'Price USD',
          'Martket Cap USD',
          'Change 24hr',
          '',
        ]}
        showBody
      />
    );
    expect(table).toMatchSnapshot();
  });
});
