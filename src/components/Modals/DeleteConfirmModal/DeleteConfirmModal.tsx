import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../../store/cartSlice';
import CloseSvg from '../../common/svg/CloseSvg';
import s from './DeleteConfirmModal.module.scss';

interface BuyCurrencyModalProps {
  open: boolean;
  close: Function;
  name: string;
}

const modalRootElement = document.querySelector('#modal') as HTMLDivElement;

const DeleteConfirmModal: FC<BuyCurrencyModalProps> = ({
  open,
  close,
  name,
}): JSX.Element => {
  const dispatch = useDispatch();
  const handleDeleteCoin = () => {
    close();
    dispatch(deleteFromCart(name));
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
              Delete {name.toUpperCase()} coin from your portfolio?
            </h1>
            <div className={s.buttonContainer}>
              <button
                className={s.modalSubmit}
                type="button"
                onClick={handleDeleteCoin}
              >
                Delete
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

export default DeleteConfirmModal;
