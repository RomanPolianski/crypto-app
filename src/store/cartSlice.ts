import { createSlice } from '@reduxjs/toolkit';

interface CartStateType {
  cartItems: Array<CartItemsType>;
  cartTotalQuantity: number;
  cartTotalAmount: number;
}

interface CartItemsType {
  name: string;
  amount: string;
}

const initialState: CartStateType = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      state.cartItems.push(payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
