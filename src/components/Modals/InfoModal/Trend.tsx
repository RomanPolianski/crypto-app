import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

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
  );
};

export default Trend;
