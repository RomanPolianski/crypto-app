/* eslint-disable no-console */
import { Chart, registerables } from 'chart.js';
import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import instance from '../../../axios/api';
import { addToCart } from '../../../store/cartSlice';
import { toUSD } from '../../../utils/formatters/toUSDformatter';
import Preloader from '../../common/Preloader';
import CloseSvg from '../../common/svg/CloseSvg';
import s from './InfoModal.module.scss';
import Trend from './Trend';

interface InfoModalProps {
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
  const [amount, setAmount] = useState<string>('');
  const numberAmount = Number(amount);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!numberAmount || numberAmount <= 0) {
      toast.error('Please Enter the correct amount!', {
        position: 'bottom-right',
      });
    } else {
      dispatch(addToCart({ name, numberAmount, priceUsd }));
      close();
      setAmount('');
    }
  };

  const fetchData = async () => {
    try {
      const response = await instance.get(
        `/assets/${name
          .toLowerCase()
          .replaceAll(/ /g, '-')}/history?interval=d1`
      );
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
  }, [open]);

  return ReactDOM.createPortal(
    <div>
      {open && (
        <div className={s.modalContainer}>
          <div className={s.modal}>
            <button
              type="button"
              className={s.closeButton}
              onClick={() => close()}
            >
              <CloseSvg />
            </button>
            <h1>{name} Extra Info</h1>
            <div className={s.cont}>
              <div className={s.infoContainer}>
                <div className={s.sidebarInfo}>
                  <p>
                    <b>Supply:</b> {Number(supply).toFixed(2)}
                  </p>
                  <p>
                    <b>Max Supply: </b>
                    {maxSupply === null ? 'N/A' : Number(maxSupply)?.toFixed(2)}
                  </p>
                  <p>
                    <b>Volume Usd 24hr:</b>{' '}
                    {toUSD.format(Number(volumeUsd24Hr))}
                  </p>
                  <p>
                    <b>Vol. Weighted Avg Price last 24hr:</b>{' '}
                    {Number(vwap24Hr).toFixed(2)}
                  </p>
                  <h2>Add to portfolio</h2>
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
                </div>
              </div>

              <div className={s.trend}>
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
