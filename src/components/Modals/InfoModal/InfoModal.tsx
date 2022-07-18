/* eslint-disable no-console */
import { Chart, registerables } from 'chart.js';
import { FC, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import instance from '../../../axios/api';
import { addToCart } from '../../../store/cartSlice';
import Preloader from '../../common/Preloader';
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
}): JSX.Element => {
  const [loading, setIsLoading] = useState<boolean>(true);
  const [Data, setData] = useState([]);
  const [amount, setAmount] = useState<string>('');
  const numberAmount = Number(amount);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (!numberAmount || numberAmount <= 0) {
      toast.error('Please Enter the correct amount!', {
        position: 'bottom-right',
      });
    } else {
      dispatch(addToCart({ name, numberAmount }));
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
            <h1>{name} Extra Info</h1>
            <div className={s.cont}>
              <div className={s.infoContainer}>
                <div className={s.sidebarInfo}>
                  <p>
                    <b>Supply:</b> {supply.slice(0, 15)}
                  </p>
                  <p>
                    <b>Max Supply: </b>
                    {maxSupply === null ? 'N/A' : maxSupply?.slice(0, 15)}
                  </p>
                  <p>
                    <b>Volume Usd 24hr:</b> {volumeUsd24Hr.slice(0, 15)}
                  </p>
                  <p>
                    <b>Vol. Weighted Avg Price last 24hr:</b>{' '}
                    {vwap24Hr.slice(0, 15)}
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
                {loading ? <Preloader /> : <Trend TrendData={Data} />}
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
