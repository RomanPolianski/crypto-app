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

export interface CartStateType {
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

export interface CartItemsType {
  id: string;
  name: string;
  numberAmount: number;
  priceUsd: string;
}

export interface AddToCartActionType {
  id: string;
  name: string;
  numberAmount: number;
  priceUsd: string;
}

export interface setCartDifferenceInfoType {
  differenceCartTotal: number;
  differenceCartTotalPercent: number;
}

export interface DeleteFromCartActionType {
  name: string;
  priceNowUsd: number;
}
