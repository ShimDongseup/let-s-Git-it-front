import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './GithubLogin.scss';
import { BASE_URL } from '../../config';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../atom';

function GithubLogin() {
  const setLoginState = useSetRecoilState(loginState);
  const navigate = useNavigate();
  const location = useLocation();
  const GITHUB_CODE: string = location.search.split('=')[1];
  const referrer = document.referrer;

  useEffect(() => {
    axios
      .post(`${BASE_URL}/auth/sign-in`, { code: GITHUB_CODE })
      .then(res => {
        if (res.data.isMember) {
          localStorage.setItem('token', res.data.accessToken);
          const token = localStorage.getItem('token') as string;
          setLoginState({
            isLogin: true,
            token,
          });
          if (referrer.indexOf('github.com') !== -1) {
            navigate(-2);
          } else {
            navigate(-1);
          }
        } else {
          navigate('/signup');
          localStorage.setItem('githubId', res.data.githubId);
          localStorage.setItem('userName', res.data.userName);
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
      <div className="wrapGithubLogin">{loginStatus}</div>
    </div>
  );
}

export default GithubLogin;
