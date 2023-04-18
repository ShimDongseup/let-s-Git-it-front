import React, { useEffect } from 'react';
import Top5 from './Top5';
import Search from '../../components/search/Search';
import { AiOutlineGithub } from 'react-icons/ai';
import './Main.scss';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { accessToken } from '../../atom';
import { getCookie } from '../../cookie';
function Main() {
  // const setAccessToken = useSetRecoilState(accessToken);
  const [token, setToken] = useRecoilState(accessToken);
  console.log(token);

  // function getCookie(name: string) {
  //   const cookie = document.cookie;
  //   const cookieArray = cookie.split(';');
  //   for (let i = 0; i < cookieArray.length; i++) {
  //     const cookieItem = cookieArray[i].trim();
  //     if (cookieItem.startsWith(name + '=')) {
  //       const token = cookieItem.substring(name.length + 1);
  //       return token;
  //     }
  //   }
  //   return null;
  // }
  // // 쿠키에서 access token 가져오기
  // const token = getCookie('Refresh');
  // console.log(token);

  useEffect(() => {
    // 토큰이 필요한 api 요청을 보내는 인스턴스
    const axiosInstance = axios.create({
      baseURL: 'https://api.lets-git-it.site',
    });

    // // 요청하기전에 인터셉트
    // axiosInstance.interceptors.request.use(
    //   config => {
    //     if (token) {
    //       // 있으면 헤더에 Authorization 추가
    //       config.headers.Authorization = `Bearer ${token}`;
    //     }
    //     return config;
    //   },
    //   error => Promise.reject(error)
    // );

    // 요청
    axiosInstance
      .get(`/auth/refresh`)
      .then(res => {
        if (res.status !== 200) {
          alert('Token재발급에 실패하였습니다.');
        } else {
          setToken(res.data.accessToken);
        }
      })
      .catch(err => console.log(err));

    // axios
    //   .get(`/auth/refresh`)
    //   .then(res => {
    //     if (res.status !== 200) {
    //       alert('Token재발급에 실패하였습니다.');
    //     } else {
    //       setAccessToken(res.data.accessToken);
    //     }
    //   })
    //   .then(err => console.log(err));
    // console.log(getCookie('Refresh'));
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
