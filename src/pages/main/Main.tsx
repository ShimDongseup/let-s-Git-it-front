import React from 'react';
import './Main.scss';
import Top5 from './Top5';
import Search from '../../components/search/Search';

function Main() {
  return (
    <div className="mainPage">
      <div className="mainWrap">
        <Search size="large" />
        <header className="top5Header">TOP 5</header>
        <Top5 />
      </div>
    </div>
  );
}

export default Main;
