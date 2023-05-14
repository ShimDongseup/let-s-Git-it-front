import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function useToken() {
  const [token, setToken] = useState('');

  useEffect(() => {
    axios.get('/auth/refresh').then(res => {
      console.log(res);
      setToken(res.data.accessToken);
    });
  }, []);

  return token;
}
