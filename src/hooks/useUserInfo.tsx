import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MyPageUserType } from '../../@types/Account';
import { useRecoilValue } from 'recoil';
import { accessToken } from '../atom';

function useUserInfo() {
  const [userInfo, setUserInfo] = useState<MyPageUserType | null>(null);
  const token = useRecoilValue(accessToken);

  const fetchUser = async () => {
    try {
      const res = await axios.get(`/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(res.data);
    } catch (err) {
      console.log(err);
      setUserInfo(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return userInfo;
}

export default useUserInfo;
