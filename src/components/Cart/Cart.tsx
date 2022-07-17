import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import s from './Cart.module.scss';

interface CartRowProps {
  name: string;
  amount: string;
}
const CartRow: FC<CartRowProps> = ({ name, amount }): JSX.Element => {
  return (
    <tr>
      <th>{name}</th>
      <th>{amount}</th>
    </tr>
  );
};

const Cart: FC = (): JSX.Element => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const c = cartItems.map((p: any) => (
    <CartRow name={p.name} amount={p.amount} />
  ));

  return (
    <>
      <h1 className={s.header}>Your Cart</h1>
      <table className={s.contentTable}>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Amount</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>{c}</tbody>
      </table>
    </>
  );
};

export default Cart;
