import React from 'react';
import './Main.scss';
import Top5 from './Top5';
import Search from '../../components/search/Search';

function Main() {
  return (
    <div className="mainPage">
      <div className="mainWrap">
        <div className="logoWrap">
          <div className="logo">let's GIT it!</div>
          <div className="info">
            아이디를 검색하여 개발 점수를 확인해보세요!
          </div>
          <div className="searchWrap">
            <Search size="large" />
          </div>
        </div>
        <header className="top5Header">TOP 5</header>
        <Top5 />
      </div>
    </div>
  );
}

export default Main;
