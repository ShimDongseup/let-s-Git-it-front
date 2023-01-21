import React from 'react';
import './Main.scss';
import Top5 from './Top5';

function Main() {
  return (
    <div className="mainWrap">
      <div>여기에 search component가 들어갑니다</div>
      <div>여기는 top5 랭킹!</div>
      <Top5 />
    </div>
  );
}

export default Main;
