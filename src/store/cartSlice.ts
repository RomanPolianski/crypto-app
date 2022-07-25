import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CartStateType {
  cartItems: Array<CartItemsType>;
  cartTotalQuantity: number;
  cartTotal: number;
  histCartTotal: Array<number>;
  cartTotalNow: number;
  differenceCartTotal: number;
  differenceCartTotalPercent: number;
  prevDifferenceCartTotal: number;
  prevDifferenceCartTotalPercent: number;
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

interface setCartDifferenceInfoType {
  differenceCartTotal: number;
  differenceCartTotalPercent: number;
}

const initialState: CartStateType = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotal: 0,
  histCartTotal: [0],
  cartTotalNow: 0,
  differenceCartTotal: 0,
  differenceCartTotalPercent: 0,
  prevDifferenceCartTotal: 0,
  prevDifferenceCartTotalPercent: 0,
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
        state.cartTotalQuantity++;
      }
      state.cartTotal += Number(payload.priceUsd) * payload.numberAmount;
      toast.success(
        `${payload.name} in amount of ${payload.numberAmount} was added to portfolio`,
        {
          position: 'bottom-right',
        }
      );
    },
    deleteFromCart(state, { payload }: PayloadAction<string>) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.name === payload
      );
      state.cartTotal -=
        state.cartItems[itemIndex].numberAmount *
        Number(state.cartItems[itemIndex].priceUsd);
      state.cartItems = state.cartItems.filter((i) => i.name !== payload);
      state.cartTotalQuantity--;
      if (state.cartTotalQuantity === 0) {
        state.cartTotal = 0;
        state.histCartTotal = [0];
      }
    },
    setCartTotalNow(state, { payload }: PayloadAction<number>) {
      state.histCartTotal.unshift(state.cartTotalNow + payload);
      state.cartTotalNow += payload;
    },
    deleteCartTotalNow(state) {
      state.cartTotalNow = 0;
    },
    setCartDifferenceInfo(
      state,
      { payload }: PayloadAction<setCartDifferenceInfoType>
    ) {
      state.differenceCartTotal = payload.differenceCartTotal;
      state.differenceCartTotalPercent = payload.differenceCartTotalPercent;
      state.prevDifferenceCartTotal = payload.differenceCartTotal;
      state.prevDifferenceCartTotalPercent = payload.differenceCartTotalPercent;
    },
    deleteCartDifferenceInfo(state) {
      state.differenceCartTotal = 0;
      state.differenceCartTotalPercent = 0;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  setCartTotalNow,
  deleteCartTotalNow,
  setCartDifferenceInfo,
  deleteCartDifferenceInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
