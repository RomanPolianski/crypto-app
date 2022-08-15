import { error } from 'console';

export function toUSD(value: number) {
  const min = Number(value) < 0.01 && Number(value) !== 0 && Number(value) > 0;
  const val = min ? 6 : 2;
  if (value > 0) {
    return new Intl.NumberFormat('us', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: val,
    }).format(Number(value));
  } else return 'error';
}
