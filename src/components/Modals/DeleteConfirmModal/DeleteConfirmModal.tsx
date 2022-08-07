import { FC, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { deleteFromCart } from '../../../store/cartSlice';
import CloseButton from '../../common/buttons/close/CloseButton';
import CloseSvg from '../../common/svg/CloseSvg';
import styles from './DeleteConfirmModal.module.scss';

interface DeleteConfirmModalProps {
  open: boolean;
  close: Function;
  name: string;
  priceNowUsd: number;
}

const modalRootElement = document.querySelector('#modal') as HTMLDivElement;

const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
  open,
  close,
  name,
  priceNowUsd,
}): JSX.Element => {
  const dispatch = useDispatch();
  const handleDeleteCoin = () => {
    close();
    dispatch(deleteFromCart({ name, priceNowUsd }));
  };
  const handleCloseModal = () => {
    close();
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
              Delete {name.toUpperCase()} coin from your portfolio?
            </h1>
            <div className={styles.modal__buttons}>
              <button
                className={styles.modal__buttons__submit}
                type="button"
                onClick={handleDeleteCoin}
              >
                Delete
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

export default DeleteConfirmModal;
