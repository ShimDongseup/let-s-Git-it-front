import axios from 'axios';
import { BASE_URL } from './config';
import { useRefresh } from './refresh';

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use(useRefresh);

export default instance;
