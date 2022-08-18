import { gql } from '@apollo/client';

export const COIN_HISTORY = gql`
  query getCoinHistory($id: String) {
    getCoinHistory(id: $id) {
      priceUsd
      time
    }
  }
`;

export const TOP3_COINS = gql`
  query getTop3Coins {
    getTop3Coins {
      id
      name
      priceUsd
      changePercent24Hr
    }
  }
`;

export const ALL_COINS = gql`
  query getAllCoins($offset: Int) {
    getAllCoins(offset: $offset) {
      id
      rank
      symbol
      name
      supply
      maxSupply
      marketCapUsd
      volumeUsd24Hr
      priceUsd
      changePercent24Hr
      vwap24Hr
    }
  }
`;

export const COINS_PRICE_NOW = gql`
  query getCurrencyPriceNow($coinsToFetch: String) {
    getCurrencyPriceNow(coinsToFetch: $coinsToFetch) {
      id
      symbol
      name
      priceUsd
      changePercent24Hr
    }
  }
`;
