import React from 'react';
import Top5 from './Top5';
import Search from '../../components/search/Search';
import { AiOutlineGithub } from 'react-icons/ai';
import './Main.scss';

function Main() {
  return (
    <main className="mainPage">
      <section className="mainWrap">
        <article className="logoWrap">
          <h1 className="logo">let's GIT it!</h1>
          <h2 className="info">
            <AiOutlineGithub className="githubIcon" />
            <span className="github">GitHub</span> 유저명을 검색하여 개발 점수를
            확인해보세요!
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
