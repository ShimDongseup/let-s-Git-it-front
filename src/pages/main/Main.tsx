import React from 'react';
import Top5 from './Top5';
import Search from '../../components/search/Search';
import { AiOutlineGithub } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';
import './Main.scss';

function Main() {
  return (
    <main className="mainPage">
      <section className="mainWrap">
        <article className="serverWrap">
          <BiError className="errIcon" />
          <h1 className="logo">let's GIT it</h1>
          <h2>서버 점검 작업으로 사이트 이용이 불가합니다.</h2>
          <h2>이용에 불편을 드려 죄송합니다.</h2>
        </article>
        {/* <article className="logoWrap">
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
        <Top5 /> */}
      </section>
    </main>
  );
}
export default Main;
