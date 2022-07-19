import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from '../../../store/cartSlice';
import CloseSvg from '../../common/svg/CloseSvg';
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
  const [amount, setAmount] = useState<string>('');
  const dispatch = useDispatch();
  const numberAmount = Number(amount);
  const handleAddToCart = () => {
    if (!numberAmount || numberAmount <= 0) {
      toast.error('Please Enter the amount!', { position: 'bottom-right' });
    } else {
      dispatch(addToCart({ name, numberAmount, priceUsd }));
      close();
      setAmount('');
    }
  };

  return ReactDOM.createPortal(
    <div>
      {open && (
        <div className={s.modalContainer}>
          <div className={s.modal}>
            <h1>Add {name.toUpperCase()} coin to your portfolio</h1>
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
            <div className={s.buttonContainer}>
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
