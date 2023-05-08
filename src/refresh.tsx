import axios from 'axios';
import { useRecoilState } from 'recoil';
import { accessToken } from './atom';

const useRefresh = async (config: any): Promise<any> => {
  const [token, setAccessToken] = useRecoilState(accessToken);

  // 토큰 갱신 서버통신
  axios
    .get(`/auth/refresh`)
    .then(res => {
      if (res.status !== 200) {
        alert('Token재발급에 실패하였습니다.');
      } else {
        setAccessToken(res.data.accessToken);
      }
    })
    .then(err => console.log(err));

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
};

export { useRefresh };
