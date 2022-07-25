import { useState, useEffect } from 'react';

export const useValidation = (value: string, validations: []) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [zeroError, setZeroError] = useState<boolean>(false);

  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'maxLength':
          value.length > validations[validation]
            ? setMaxLengthError(true)
            : setMaxLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isAbove0':
          Number(value) <= 0 ? setZeroError(true) : setZeroError(false);
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError || maxLengthError || zeroError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, zeroError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    zeroError,
    inputValid,
  };
};
