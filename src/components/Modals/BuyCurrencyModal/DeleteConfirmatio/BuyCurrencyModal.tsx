import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../store/cartSlice';
import { toUSD } from '../../../../utils/formatters/toUSDformatter';
import { useInput } from '../../../../utils/validators/useInputHook';
import CloseSvg from '../../../common/svg/CloseSvg';
import s from './BuyCurrencyModal.module.scss';

interface BuyCurrencyModalProps {
  open: boolean;
  close: Function;
  name: string;
  priceUsd: string;
}

const modalRootElement = document.querySelector('#modal') as HTMLDivElement;

const BuyCurrencyModal: FC<BuyCurrencyModalProps> = ({
  open,
  close,
  name,
  priceUsd,
}): JSX.Element => {
  const amount = useInput('', {
    minLength: 1,
    maxLength: 9,
    isEmpty: true,
    isAbove0: true,
  });
  const dispatch = useDispatch();
  const numberAmount = Number(amount.value);
  const handleAddToCart = () => {
    if (amount.inputValid) {
      dispatch(addToCart({ name, numberAmount, priceUsd }));
      close();
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  return ReactDOM.createPortal(
    <div>
      {open && (
        <div className={s.modalContainer}>
          <div className={s.modal}>
            <h1 className={s.header}>
              Add {name.toUpperCase()} coin to your portfolio
            </h1>
            <p>
              <b>Price of 1 coin is {toUSD.format(Number(priceUsd))}</b>
            </p>
            <p>Enter the amount</p>
            <input
              className={s.inputAmount}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                amount.onChange(e)
              }
              onBlur={(e) => amount.onBlur(e)}
              value={amount.value}
              step={0.01}
              min={0}
            />
            {amount.isDirty && amount.isEmpty && (
              <div className={s.errMsg}>Field cannot be empty!</div>
            )}
            {amount.maxLengthError && (
              <div className={s.errMsg}>Max amount is 9 digits!</div>
            )}
            {amount.isDirty && amount.zeroError && (
              <div className={s.errMsg}>Amount must be above 0!</div>
            )}
            <div className={s.buttonContainer}>
              <button
                className={s.modalSubmit}
                type="button"
                onClick={handleAddToCart}
                disabled={!amount.inputValid}
              >
                Add
              </button>
              <button
                type="button"
                className={s.closeModalIcon}
                onClick={() => close()}
              >
                <CloseSvg />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    modalRootElement
  );
};

export default BuyCurrencyModal;
