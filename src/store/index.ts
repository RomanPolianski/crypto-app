import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import currencyReducer from './currencySlice';

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
