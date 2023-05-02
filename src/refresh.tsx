import axios from 'axios';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { accessToken } from './atom';
import { BASE_URL } from './config';

const useRefresh = async (config: any): Promise<any> => {
  const refreshToken = Cookies.get('Refresh');
  const [token, setAccessToken] = useRecoilState(accessToken);

  // refreshToken 이 저장되어 있을 때
  if (refreshToken) {
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
  }

  config.headers = {
    Authorization: `Bearer ${token}`,
  };

  return config;
};

export { useRefresh };
