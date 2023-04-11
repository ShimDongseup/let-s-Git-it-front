import axios, { InternalAxiosRequestConfig } from 'axios';
import Cookie from 'js-cookie';
import { BASE_URL } from './config';
const refresh = async (
  config: InternalAxiosRequestConfig
): Promise<InternalAxiosRequestConfig> => {
  const refreshToken = Cookie.get('refreshToken');
  let token = localStorage.getItem('accessToken');
  // 토큰이 만료되었고, refreshToken 이 저장되어 있을 때
  if (refreshToken) {
    const body = {
      refreshToken,
    };
    // 토큰 갱신 서버통신
    const { data } = await axios.post(`${BASE_URL}/auth`, body);
    token = data.data.accessToken;
    localStorage.setItem('accessToken', data.data.accessToken);
  }
  // config.headers = {
  //   Authorization: `Bearer ${token}` as string,
  // };
  return config;
};
const refreshRemove = (err: any) => {
  Cookie.remove('refreshToken');
};
export { refresh, refreshRemove };
