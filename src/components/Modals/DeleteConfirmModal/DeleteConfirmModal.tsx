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
        <div className={s.modal}>
          <div className={s.modal__body}>
            <h1 className={s.modal__header}>
              Delete {name.toUpperCase()} coin from your portfolio?
            </h1>
            <div className={s.modal__buttons}>
              <button
                className={s.modal__buttons__submit}
                type="button"
                onClick={handleDeleteCoin}
              >
                Delete
              </button>
              <button
                type="button"
                className={s.modal__buttons__close}
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
