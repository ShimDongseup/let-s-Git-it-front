import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GithubLogin.scss';
import { BASE_URL } from '../../config';
import { useSetRecoilState } from 'recoil';
import { accessToken } from '../../atom';

function GithubLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const GITHUB_CODE: string = location.search.split('=')[1];
  const setAccessToken = useSetRecoilState(accessToken);

  useEffect(() => {
    axios
      .post(`${BASE_URL}/auth/sign-in`, { code: GITHUB_CODE })
      .then(res => {
        localStorage.setItem('userName', res.data.userName);
        if (res.data.isMember) {
          // localStorage.setItem('token', res.data.accessToken);
          setAccessToken(res.data.accessToken);
          window.location.href = localStorage.getItem('referrer') as string;
          localStorage.removeItem('referrer');
        } else {
          navigate('/signup');
          localStorage.setItem('githubId', res.data.githubId);
        }
      })
      .catch(err => console.log(err));
  }, [GITHUB_CODE]);

  const completionWord: string = '로그인 중입니다...';
  const [loginStatus, setLoginStatus] = useState<string>('');
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    const typingInterval = setInterval(() => {
      setLoginStatus(prevStatusValue => {
        let result = prevStatusValue
          ? prevStatusValue + completionWord[count]
          : completionWord[0];
        setCount(count + 1);
        if (count >= completionWord.length) {
          setCount(0);
          setLoginStatus('');
        }
        return result;
      });
    }, 200);
    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <div className="wrapper">
      <main className="wrapGithubLogin">{loginStatus}</main>
    </div>
  );
}

export default GithubLogin;
