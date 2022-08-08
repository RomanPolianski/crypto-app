import { Table } from './Table';
import './Table.module.scss';

export default {
  title: 'common/Table',
  component: Table,
};

export const Default = () => (
  <Table
    headers={[
      'Coin',
      'Amount',
      'Price when added',
      'Price Now',
      'Total when added',
      'Total Now',
      'Difference',
      '',
    ]}
    showBody={false}
  />
);
