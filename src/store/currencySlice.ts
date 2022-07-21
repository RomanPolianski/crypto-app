import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import instance from '../axios/api';

export interface CurrencyStateType {
  currencies: Array<CurType>;
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
  'contacts/fetchContacts',
  async (_, { dispatch }) => {
    try {
      const response = await instance.get('/assets');
      if (response.status === 200) {
        dispatch(setCurrencies(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState: CurrencyStateType = {
  currencies: [],
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrencies(state, { payload }) {
      state.currencies = payload.data;
    },
  },
});

export const { setCurrencies } = currencySlice.actions;

export default currencySlice.reducer;
