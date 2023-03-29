import axios from 'axios';
import { BASE_URL } from './config';
import { refresh, refreshRemove } from './refresh';

const Api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {},
});

Api.interceptors.request.use(refresh, refreshRemove);

export default Api;
