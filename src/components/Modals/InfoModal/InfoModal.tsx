import { useQuery } from '@apollo/client';
import { Chart, registerables } from 'chart.js';
import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/cartSlice';
import { toUSD } from '../../../utils/formatters/toUSDformatter';
import { useInput } from '../../../utils/validators/useInputHook';
import CloseButton from '../../common/buttons/close/CloseButton';
import { InputField } from '../../common/input/InputField';
import Preloader from '../../common/preloader/Preloader';
import styles from './InfoModal.module.scss';
import Trend from './Trend';
import { COIN_HISTORY } from '../../../apollo/queries';

interface InfoModalProps {
  id: string;
  open: boolean;
  close: Function;
  name: string;
  supply: string;
  maxSupply: string | null;
  volumeUsd24Hr: string;
  vwap24Hr: string;
  priceUsd: string;
}

Chart.register(...registerables);

const modalRootElement = document.querySelector('#infoModal') as HTMLDivElement;

const InfoModal: FC<InfoModalProps> = ({
  id,
  open,
  close,
  name,
  supply,
  maxSupply,
  volumeUsd24Hr,
  vwap24Hr,
  priceUsd,
}): JSX.Element => {
  const [loadingPage, setIsLoading] = useState<boolean>(true);
  const [dataCoin, setData] = useState([]);
  const amount = useInput('', {
    minLength: 1,
    maxLength: 9,
    isEmpty: true,
    isAbove0: true,
    isAfterDot: true,
  });
  const numberAmount = Number(amount.value);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    close();
  };
  const handleAddToCart = () => {
    if (amount.inputValid) {
      dispatch(addToCart({ id, name, numberAmount, priceUsd }));
      close();
    }
  };

  const { loading, error, data } = useQuery(COIN_HISTORY, {
    variables: { id: id },
  });

  if (error) {
    return <h2>Error</h2>;
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    }
    if (!loading) {
      setData(data.getCoinHistory);
      setIsLoading(false);
    }
  }, [data]);

  return ReactDOM.createPortal(
    <div>
      {open && (
        <div className={styles.modal}>
          <div className={styles.modal__body}>
            <span className={styles.modal__closeButton}>
              <CloseButton
                onclick={handleCloseModal}
                form="round"
                variant="close"
              />
            </span>

            <h1 className={styles.modal__name}>{name} Extra Info</h1>
            <div className={styles.infoContainer}>
              <div className={styles.infoContainer__body}>
                <div className={styles.infoContainer__sidebar}>
                  <p className={styles.infoContainer__text}>
                    <b>Supply:</b> {Number(supply).toFixed(2)}
                  </p>
                  <p className={styles.infoContainer__text}>
                    <b>Max Supply: </b>
                    {maxSupply === null ? 'N/A' : Number(maxSupply)?.toFixed(2)}
                  </p>
                  <p className={styles.infoContainer__text}>
                    <b>Volume Usd 24hr:</b> {toUSD(Number(volumeUsd24Hr))}
                  </p>
                  <p className={styles.infoContainer__text}>
                    <b>Vol. Weighted Avg Price last 24hr:</b>{' '}
                    {Number(vwap24Hr).toFixed(2)}
                  </p>
                  <h2 className={styles.infoContainer__subHeader}>
                    Add to portfolio
                  </h2>
                  <InputField data={amount} />

                  <button
                    className={styles.infoContainer__modalSubmitBtn}
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!amount.inputValid}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className={styles.trend}>
                {loadingPage ? <Preloader /> : <Trend trendData={dataCoin} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>,
    modalRootElement
  );
};
export default InfoModal;
