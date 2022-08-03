import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import styles from './InfoModal.module.scss';

Chart.register(...registerables);

interface TrendPropsTypes {
  trendData: Array<TrendDataArray>;
}

interface TrendDataArray {
  priceUsd: string;
  time: number;
  date: string;
}

const Trend: FC<TrendPropsTypes> = ({ trendData }): JSX.Element => {
  const days = 365;

  return (
    <div className={styles.trend__canvas}>
      <Line
        data={{
          labels: trendData.map((c) => {
            const date = new Date(c.time);
            return date.toLocaleDateString();
          }),
          datasets: [
            {
              data: trendData.map((c) => {
                return c.priceUsd;
              }),
              label: `Price (past ${days} Days)`,
              borderColor: 'rgb(117, 0, 92)',
            },
          ],
        }}
        options={{
          elements: {
            point: {
              radius: 1,
            },
          },
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Trend;
