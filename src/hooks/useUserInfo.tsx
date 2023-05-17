import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MyPageUserType } from '../../@types/Account';
import { useRecoilValue } from 'recoil';
import { accessToken } from '../atom';
import { BASE_URL } from '../config';

function useUserInfo() {
  const [userInfo, setUserInfo] = useState<MyPageUserType | null>(null);
  const token = useRecoilValue(accessToken);

  const fetchUser = () => {
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => setUserInfo(res.data))
      .catch(err => setUserInfo(null));
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  return userInfo;
}

export default useUserInfo;
