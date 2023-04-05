import axios from 'axios';
import { BASE_URL } from './config';
import { useRefresh } from './refresh';

const Api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {},
});

Api.interceptors.request.use(useRefresh);

export default Api;
