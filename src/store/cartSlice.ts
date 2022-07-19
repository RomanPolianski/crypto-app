/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartStateType {
  cartItems: Array<CartItemsType>;
  cartTotalQuantity: number;
  cartTotal: number;
  cartTotalNow: number;
}

interface CartItemsType {
  name: string;
  numberAmount: number;
  priceUsd: string;
}

interface AddToCartActionType {
  name: string;
  numberAmount: number;
  priceUsd: string;
}

const initialState: CartStateType = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotal: 0,
  cartTotalNow: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, { payload }: PayloadAction<AddToCartActionType>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.name === payload.name
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].numberAmount += payload.numberAmount;
      } else {
        state.cartItems.push(payload);
        state.cartTotalQuantity += 1;
      }
      state.cartTotal += Number(payload.priceUsd) * payload.numberAmount;
      toast.success(`${payload.name} was added to portfolio`, {
        position: 'bottom-right',
      });
    },
    deleteFromCart(state, { payload }: PayloadAction<string>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.name === payload
      );
      state.cartTotal -=
        state.cartItems[itemIndex].numberAmount *
        Number(state.cartItems[itemIndex].priceUsd);
      state.cartItems = state.cartItems.filter((i) => i.name !== payload);
      state.cartTotalQuantity -= 1;
      if (state.cartTotalQuantity === 0) {
        state.cartTotal = 0;
      }
    },
    setCartTotalNow(state, { payload }: PayloadAction<number>) {
      state.cartTotalNow += payload;
    },
  },
});

export const { addToCart, deleteFromCart, setCartTotalNow } = cartSlice.actions;

export default cartSlice.reducer;
