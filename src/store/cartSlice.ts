import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NumberValue } from 'd3';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../axios/api';

import {
  AddToCartActionType,
  CartStateType,
  DeleteFromCartActionType,
  setCartDifferenceInfoType,
} from './cartSliceTypes';

interface setCurrentCartTypeAction {
  name: string;
  totalCoinPriceNow: number;
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
  diagramData: [],
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
      state.histCartTotal.unshift(state.cartTotal);
      toast.success(
        `${payload.name} in amount of ${payload.numberAmount} was added to portfolio`,
        {
          position: 'bottom-right',
        }
      );
    },
    deleteFromCart(
      state,
      { payload }: PayloadAction<DeleteFromCartActionType>
    ) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.name === payload.name
      );
      state.cartTotal -=
        state.cartItems[itemIndex].numberAmount *
        Number(state.cartItems[itemIndex].priceUsd);
      state.cartItems = state.cartItems.filter((i) => i.name !== payload.name);
      state.currentCartCoinsData = state.currentCartCoinsData.filter(
        (i) => i.name !== payload.name
      );
      state.histCartTotal.unshift(state.cartTotal - payload.priceNowUsd);
      state.cartTotalQuantity--;
      if (state.cartTotalQuantity === 0) {
        state.cartTotal = 0;
        state.histCartTotal = [0];
      }
    },
    setCartTotalNow(
      state,
      { payload }: PayloadAction<setCurrentCartTypeAction>
    ) {
      state.histCartTotal.unshift(
        state.cartTotalNow + payload.totalCoinPriceNow
      );
      state.cartTotalNow += payload.totalCoinPriceNow;
      state.diagramData.push({
        name: payload.name,
        value: payload.totalCoinPriceNow,
      });
    },
    deleteCartTotalNow(
      state,
      { payload }: PayloadAction<setCurrentCartTypeAction>
    ) {
      state.cartTotalNow -= payload.totalCoinPriceNow;
      state.diagramData = state.diagramData.filter(
        (obj) => obj.name !== payload.name
      );
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
