import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios/api';
import { CurType } from './currencySlice';

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
  currentCartCoinsData: Array<CurType>;
}

interface CartItemsType {
  id: string;
  name: string;
  numberAmount: number;
  priceUsd: string;
}

interface AddToCartActionType {
  id: string;
  name: string;
  numberAmount: number;
  priceUsd: string;
}

interface setCartDifferenceInfoType {
  differenceCartTotal: number;
  differenceCartTotalPercent: number;
}

export const fetchCurrencyPriceNow = createAsyncThunk(
  'cart/fetchCurrencyPriceNow',
  async (coinsToFetch: string, { dispatch }) => {
    try {
      const response = await instance.get(`/assets?ids=${coinsToFetch}`);
      if (response.status === 200) {
        dispatch(setCurrentCartCoinsData(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

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
  currentCartCoinsData: [],
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
      state.histCartTotal.push(state.cartTotal + Number(payload.priceUsd));
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
      state.currentCartCoinsData = state.currentCartCoinsData.filter(
        (i) => i.name !== payload
      );

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
    deleteCartTotalNow(state, { payload }: PayloadAction<number>) {
      state.cartTotalNow -= payload;
      if (state.cartTotalQuantity === 0) {
        state.cartTotal = 0;
        state.differenceCartTotal = 0;
        state.differenceCartTotalPercent = 0;
      }
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
    setCurrentCartCoinsData(state, { payload }) {
      state.currentCartCoinsData = payload.data;
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
  setCurrentCartCoinsData,
} = cartSlice.actions;

export default cartSlice.reducer;
