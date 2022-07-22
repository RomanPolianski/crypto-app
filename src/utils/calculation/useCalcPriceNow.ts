import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const useCalcPriceNow = (amount: number, priceUsd: string, name: string) => {
  const currencies = useSelector(
    (state: RootState) => state.currency.currencies
  );
  const itemIndex = currencies.findIndex((item) => item.name === name);

  const priceNow = currencies[itemIndex].priceUsd;
  const totalCoinPriceNow = Number(priceNow) * amount;
  const isRising = Number(priceUsd) < Number(priceNow);
  const difference = (Number(priceNow) * 100) / Number(priceUsd) - 100;

  return {
    priceNow,
    totalCoinPriceNow,
    isRising,
    difference,
  };
};

export default useCalcPriceNow;
