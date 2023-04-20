import React, { useEffect } from 'react';
import Top5 from './Top5';
import Search from '../../components/search/Search';
import { AiOutlineGithub } from 'react-icons/ai';
import './Main.scss';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { accessToken } from '../../atom';
function Main() {
  const [token, setToken] = useRecoilState(accessToken);

  console.log(token);

  useEffect(() => {
    // 토큰이 필요한 api 요청을 보내는 인스턴스
    const axiosInstance = axios.create({
      baseURL: 'https://api.lets-git-it.site',
      withCredentials: true,
    });

    // // 요청하기전에 인터셉트
    // axiosInstance.interceptors.request.use(
    //   config => {
    //     if (token) {
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    //   },
    //   error => Promise.reject(error)
    // );

    // // 쿠키에서 refresh token 가져오기
    // function getCookie(name: string) {
    //   const value = `; ${document.cookie};`;
    //   const parts = value.split(`; ${name}=`);
    //   if (parts.length === 2) return parts.pop()?.split(';').shift();
    // }
    // const Refresh = getCookie('Refresh');
    // console.log(Refresh);

    // axiosInstance.interceptors.response.use(
    //   response => response,
    //   error => {
    //     const originalRequest = error.config;
    //     if (error.response.status === 401 && !originalRequest._retry) {
    //       originalRequest._retry = true;
    //       return axiosInstance
    //         .get('/auth/refresh')
    //         .then(res => {
    //           if (res.status === 200) {
    //             setToken(res.data.accessToken);
    //             return axiosInstance(originalRequest);
    //           }
    //         })
    //         .catch(err => console.log(err));
    //     }
    //     return Promise.reject(error);
    //   }
    // );

    axios
      .get(`/auth/refresh`)
      .then(res => {
        if (res.status !== 200) {
          alert('Token재발급에 실패하였습니다.');
        } else {
          setToken(res.data.accessToken);
        }
      })
      .then(err => console.log(err));
  }, []);
  return (
    <main className="mainPage">
      <section className="mainWrap">
        <article className="logoWrap">
          <h1 className="logo">let's GIT it!</h1>
          <h2 className="info">
            <div className="github">
              <AiOutlineGithub className="githubIcon" />
              <span>GitHub</span>
            </div>
            <span className="msg">
              유저명을 검색하여 개발 점수를 확인해보세요!
            </span>
          </h2>
          <section className="searchWrap">
            <Search size="large" />
          </section>
        </article>
        <h1 className="top5Header">TOP 5</h1>
        <Top5 />
      </section>
    </main>
  );
}
export default Main;
