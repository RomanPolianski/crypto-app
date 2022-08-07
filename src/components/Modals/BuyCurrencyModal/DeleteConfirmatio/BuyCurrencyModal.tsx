import React, { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../store/cartSlice';
import { toUSD } from '../../../../utils/formatters/toUSDformatter';
import { useInput } from '../../../../utils/validators/useInputHook';
import CloseButton from '../../../common/buttons/close/CloseButton';
import { InputField } from '../../../common/input/InputField';
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
  const handleCloseModal = () => {
    close();
  };
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
            <InputField data={amount} />

            <div className={styles.modal__buttons}>
              <button
                className={styles.modal__buttons__submit}
                type="button"
                onClick={handleAddToCart}
                disabled={!amount.inputValid}
              >
                Add
              </button>
              <span className={styles.modal__buttons__close}>
                <CloseButton
                  onclick={handleCloseModal}
                  form="square"
                  variant="close"
                />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>,
    modalRootElement
  );
};

export default BuyCurrencyModal;
