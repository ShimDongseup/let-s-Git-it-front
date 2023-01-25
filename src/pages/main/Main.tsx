import React from 'react';
import './Main.scss';
import Top5 from './Top5';

function Main() {
  return (
    <div className="mainPage">
      <div className="mainWrap">
        <div>Search Component</div>
        <header className="top5Header">Top5</header>
        <Top5 />
      </div>
    </div>
  );
}

export default Main;
