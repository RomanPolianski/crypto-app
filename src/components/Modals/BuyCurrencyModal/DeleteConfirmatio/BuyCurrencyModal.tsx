import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../store/cartSlice';
import { toUSD } from '../../../../utils/formatters/toUSDformatter';
import { useInput } from '../../../../utils/validators/useInputHook';
import CloseSvg from '../../../common/svg/CloseSvg';
import styles from './BuyCurrencyModal.module.scss';

interface BuyCurrencyModalProps {
  id: string;
  open: boolean;
  close: Function;
  name: string;
  priceUsd: string;
}

const modalRootElement = document.querySelector('#modal') as HTMLDivElement;

const BuyCurrencyModal: FC<BuyCurrencyModalProps> = ({
  id,
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
    isAfterDot: true,
  });
  const dispatch = useDispatch();
  const numberAmount = Number(amount.value);
  const handleAddToCart = () => {
    if (amount.inputValid) {
      dispatch(addToCart({ id, name, numberAmount, priceUsd }));
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
        <div className={styles.modal}>
          <div className={styles.modal__body}>
            <h1 className={styles.modal__header}>
              Add {name.toUpperCase()} coin to your portfolio
            </h1>
            <p>
              <b>Price of 1 coin is {toUSD(Number(priceUsd))}</b>
            </p>
            <p>Enter the amount</p>
            <input
              className={styles.modal__input}
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
              <div className={styles.modal__input_error}>
                Field cannot be empty!
              </div>
            )}
            {amount.maxLengthError && (
              <div className={styles.modal__input_error}>
                Max amount is 9 digits!
              </div>
            )}
            {!amount.isEmpty && !amount.afterDotError && amount.zeroError && (
              <div className={styles.modal__input_error}>
                Amount must be above 0!
              </div>
            )}
            {!amount.isEmpty && amount.afterDotError && (
              <div className={styles.modal__input_error}>
                Max 2 digits after comma
              </div>
            )}

            <div className={styles.modal__buttons}>
              <button
                className={styles.modal__buttons__submit}
                type="button"
                onClick={handleAddToCart}
                disabled={!amount.inputValid}
              >
                Add
              </button>
              <button
                type="button"
                className={styles.modal__buttons__close}
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
