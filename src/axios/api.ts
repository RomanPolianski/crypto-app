import axios from 'axios';

export const API_URL = 'https://api.coincap.io/v2/';

const instance = axios.create({
  baseURL: API_URL,
});

export default instance;
