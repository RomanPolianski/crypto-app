import { useState, useEffect } from 'react';

export const useValidation = (value: string, validations: []) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [zeroError, setZeroError] = useState<boolean>(false);
  const [afterDotError, setAfterDotError] = useState<boolean>(false);

  const regExAfterDot = /^\d+(\.\d{0,2})?$/;
  const regExNoZeros = /^(?!0\d*$)\d+(?:\.\d{1,2})?$/;

  const [inputValid, setInputValid] = useState<boolean>(false);
  console.log(value);
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
          regExNoZeros.test(value) ? setZeroError(false) : setZeroError(true);
          break;
        case 'isAfterDot':
          regExAfterDot.test(value)
            ? setAfterDotError(false)
            : setAfterDotError(true);
          break;
        default:
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (
      isEmpty ||
      minLengthError ||
      maxLengthError ||
      zeroError ||
      afterDotError
    ) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError, maxLengthError, zeroError, afterDotError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    zeroError,
    afterDotError,
    inputValid,
  };
};
