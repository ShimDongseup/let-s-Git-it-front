import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.scss';

function NoArticle() {
  return (
    <section className="errorPage">
      <header className="errorWrap">
        <div className="logo">let's GIT it!</div>
        <div className="detailMsg">게시글이 존재하지 않습니다</div>
        <Link className="goBackToList" to="/articleList">
          목록으로 돌아가기
        </Link>
      </header>
    </section>
  );
}

export default NoArticle;
