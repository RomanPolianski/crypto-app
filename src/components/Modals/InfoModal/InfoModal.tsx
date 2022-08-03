import { Chart, registerables } from 'chart.js';
import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import instance from '../../../axios/api';
import { addToCart } from '../../../store/cartSlice';
import { toUSD } from '../../../utils/formatters/toUSDformatter';
import { useInput } from '../../../utils/validators/useInputHook';
import Preloader from '../../common/Preloader';
import CloseSvg from '../../common/svg/CloseSvg';
import styles from './InfoModal.module.scss';
import Trend from './Trend';

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
  const [loading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState([]);
  const amount = useInput('', {
    minLength: 1,
    maxLength: 9,
    isEmpty: true,
    isAbove0: true,
  });
  const numberAmount = Number(amount.value);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (amount.inputValid) {
      dispatch(addToCart({ id, name, numberAmount, priceUsd }));
      close();
    }
  };

  const fetchData = async () => {
    try {
      const response = await instance.get(`/assets/${id}/history?interval=d1`);
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
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
            <button
              type="button"
              className={styles.modal__closeButton}
              onClick={() => close()}
            >
              <CloseSvg />
            </button>
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
                    <b>Volume Usd 24hr:</b>{' '}
                    {toUSD.format(Number(volumeUsd24Hr))}
                  </p>
                  <p className={styles.infoContainer__text}>
                    <b>Vol. Weighted Avg Price last 24hr:</b>{' '}
                    {Number(vwap24Hr).toFixed(2)}
                  </p>
                  <h2 className={styles.infoContainer__subHeader}>
                    Add to portfolio
                  </h2>
                  <input
                    className={styles.infoContainer__inputAmount}
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      amount.onChange(e)
                    }
                    onBlur={(e) => amount.onBlur(e)}
                    value={amount.value}
                    step={0.01}
                    min={0}
                  />

                  <button
                    className={styles.infoContainer__modalSubmitBtn}
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!amount.inputValid}
                  >
                    Add
                  </button>
                  {amount.isDirty && amount.isEmpty && (
                    <div className={styles.infoContainer__error}>
                      Field cannot be empty!
                    </div>
                  )}
                  {amount.maxLengthError && (
                    <div className={styles.infoContainer__error}>
                      Max amount is 9 digits!
                    </div>
                  )}
                  {amount.isDirty && amount.zeroError && (
                    <div className={styles.infoContainer__error}>
                      Amount must be above 0!
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.trend}>
                {loading ? <Preloader /> : <Trend trendData={data} />}
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
