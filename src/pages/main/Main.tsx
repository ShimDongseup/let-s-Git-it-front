import React, { useEffect } from 'react';
import Top5 from './Top5';
import Search from '../../components/search/Search';
import { AiOutlineGithub } from 'react-icons/ai';
import './Main.scss';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { accessToken } from '../../atom';

function Main() {
  // const setAccessToken = useSetRecoilState(accessToken);
  // useEffect(() => {
  //   axios
  //     .get(`/auth/refresh`)
  //     .then(res => {
  //       if (res.status !== 200) {
  //         alert('Token재발급에 실패하였습니다.');
  //       } else {
  //         setAccessToken(res.data.accessToken);
  //       }
  //     })
  //     .then(err => console.log(err));
  // }, []);

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
