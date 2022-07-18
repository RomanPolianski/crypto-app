import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../store/cartSlice';
import s from './BuyCurrencyModal.module.scss';

interface BuyCurrencyModalProps {
  open: boolean;
  close: Function;
  name: string;
}

const modalRootElement = document.querySelector('#modal') as HTMLDivElement;

const BuyCurrencyModal: FC<BuyCurrencyModalProps> = ({
  open,
  close,
  name,
}): JSX.Element => {
  const [amount, setAmount] = useState<string>('0');
  const dispatch = useDispatch();
  const numberAmount = Number(amount);
  const handleAddToCart = () => {
    if (!numberAmount) {
      toast.error('Enter the amount!', { position: 'bottom-right' });
    } else {
      dispatch(addToCart({ name, numberAmount }));
      close();
    }
  };

  return ReactDOM.createPortal(
    <div>
      {open && (
        <div className={s.modalContainer}>
          <div className={s.modal}>
            <h1>Add {name} coin to cart</h1>
            <p>Enter the amount</p>
            <input
              className={s.inputAmount}
              type="number"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAmount(e.target.value)
              }
              value={amount}
              step={0.01}
              min={0}
            />
            <button
              className={s.modalSubmit}
              type="button"
              onClick={handleAddToCart}
            >
              Add
            </button>
            <button
              type="button"
              className={s.closeModalIcon}
              onClick={() => close()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                {' '}
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />{' '}
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>,
    modalRootElement
  );
};

export default BuyCurrencyModal;
