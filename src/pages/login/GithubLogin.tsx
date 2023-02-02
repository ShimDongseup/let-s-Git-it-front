import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './GithubLogin.scss';

function GithubLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const GITHUB_CODE: string = location.search.split('=')[1];

  // useEffect(() => {
  //   fetch(`로그인api/users/githublogin?code=${GITHUB_CODE}`, {
  //     method: 'GET',
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       localStorage.setItem('token', data.userData.accessToken);
  //       if (data.userData.isMember === true) {
  //         navigate('/');
  //       } else {
  //         navigate('/signup');
  //       }
  //     });
  // }, []);

  const completionWord: string = '로그인 중입니다...';
  const [loginStatus, setLoginStatus] = useState('');
  const [count, setCount] = useState(0);
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
