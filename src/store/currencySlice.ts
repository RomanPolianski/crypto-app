import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '../axios/api';

export interface CurrencyStateType {
  currencies: Array<CurType>;
  top3Currencies: Array<CurType>;
}

export interface CurType {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
}

export const fetchCurrencies = createAsyncThunk(
  'currency/fetchCurrencies',
  async (offset: number, { dispatch }) => {
    try {
      const response = await instance.get(`/assets?offset=${offset}&limit=10`);
      if (response.status === 200) {
        dispatch(setCurrencies(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchTop3Currencies = createAsyncThunk(
  'currency/fetchTop3Currencies',
  async (_, { dispatch }) => {
    try {
      const response = await instance.get('/assets?limit=3');
      if (response.status === 200) {
        dispatch(setTop3Currencies(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: CurrencyStateType = {
  currencies: [],
  top3Currencies: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencies(state, { payload }) {
      state.currencies = payload.data;
    },
    setTop3Currencies(state, { payload }) {
      state.top3Currencies = payload.data;
    },
  },
});

export const { setCurrencies, setTop3Currencies } = currencySlice.actions;

export default currencySlice.reducer;
