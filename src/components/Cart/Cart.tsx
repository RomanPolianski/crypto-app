import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { deleteFromCart } from '../../store/cartSlice';
import s from './Cart.module.scss';

interface CartRowProps {
  name: string;
  amount: string;
}
const CartRow: FC<CartRowProps> = ({ name, amount }): JSX.Element => {
  const dispatch = useDispatch();
  const handleDeleteCoin = () => {
    dispatch(deleteFromCart(name));
  };
  return (
    <tr>
      <th>{name}</th>
      <th>{amount}</th>
      <th>
        <button
          type="button"
          onClick={handleDeleteCoin}
          className={s.deleteButton}
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
      </th>
    </tr>
  );
};

const Cart: FC = (): JSX.Element => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  const c = cartItems.map((p: any) => (
    <CartRow name={p.name} amount={p.amount} />
  ));

  return (
    <div>
      {cartItems.length !== 0 ? (
        <>
          <h1 className={s.header}>Your Cart.</h1>
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
      ) : (
        <h1 className={s.header}>Your Cart is Empty!</h1>
      )}
    </div>
  );
};

export default Cart;
