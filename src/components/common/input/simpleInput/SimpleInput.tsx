import { useState } from 'react';

const SimpleInput = () => {
  const [inputValue, setInputValue] = useState('');

  return (
    <input
      type="text"
      className="text-input"
      data-testid="custom-element"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
};

export default SimpleInput;
