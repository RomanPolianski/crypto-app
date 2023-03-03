import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SimpleInput from './SimpleInput';

describe('Input field test', () => {
  it('Is input field visible', () => {
    render(<SimpleInput />);
    const inputField = screen.getByRole('textbox');
    expect(inputField).toBeInTheDocument();
  });

  it('should be able to type in input', async () => {
    render(<SimpleInput />);
    const inputField = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(inputField, { target: { value: 'Hello world' } });
    expect(inputField.value).toBe('Hello world');
  });
});
