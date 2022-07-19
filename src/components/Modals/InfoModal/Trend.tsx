/* eslint-disable prefer-const */
/* eslint-disable no-debugger */
import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface TrendPropsTypes {
  trendData: any;
}

const Trend: FC<TrendPropsTypes> = ({ trendData }): JSX.Element => {
  let days = 365;

  return (
    <Line
      data={{
        labels: trendData.map((c: { time: string | number | Date }) => {
          let date = new Date(c.time);
          let time =
            date.getHours() > 12
              ? `${date.getHours() - 12}:${date.getMinutes()} PM}`
              : `${date.getHours()}:${date.getMinutes()} AM}`;

          return days === 1 ? time : date.toLocaleDateString();
        }),
        datasets: [
          {
            data: trendData.map((c: { priceUsd: any }) => {
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
      }}
    />
  );
};

export default Trend;
