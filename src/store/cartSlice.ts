/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartStateType {
  cartItems: Array<CartItemsType>;
  cartTotalQuantity: number;
}

interface CartItemsType {
  name: string;
  amount: string;
}

const initialState: CartStateType = {
  cartItems: [],
  cartTotalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      state.cartItems.push(payload);
      state.cartTotalQuantity += 1;
      toast.success(`${payload.name} was added to cart`, {
        position: 'bottom-right',
      });
    },
    deleteFromCart(state, { payload }) {
      state.cartItems = state.cartItems.filter((i) => i.name !== payload);
      state.cartTotalQuantity -= 1;
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
