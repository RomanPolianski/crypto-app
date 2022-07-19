/* eslint-disable no-debugger */
/* eslint-disable prefer-const */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
/* eslint-disable no-param-reassign */
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartStateType {
  cartItems: Array<CartItemsType>;
  cartTotalQuantity: number;
}

interface CartItemsType {
  name: string;
  numberAmount: number;
}

interface AddToCartActionType {
  name: string;
  numberAmount: number;
}

// interface DeleteFromCartActionType {
//   name: string;
// }

const initialState: CartStateType = {
  cartItems: [],
  cartTotalQuantity: 0,
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

      toast.success(`${payload.name} was added to portfolio`, {
        position: 'bottom-right',
      });
    },
    deleteFromCart(state, { payload }: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter((i) => i.name !== payload);
      state.cartTotalQuantity -= 1;
    },
  },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;

export default cartSlice.reducer;
