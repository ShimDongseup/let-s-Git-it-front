import React from 'react';
import ArticlePost from './components/ArticlePost';
import Paging from './components/Paging';
import ArticleMenu from '../articleMenu/ArticleMenu';
import './articleList.scss';

function ArticleList() {
  return (
    <div className="community">
      <div className="articleInner">
        <ArticleMenu />
        <div className="articleList">
          <div className="articleListSort">
            <span>최근 게시물</span>
            <span>인기 게시물</span>
          </div>
          <div className="articleListInner">
            <ArticlePost />
            <ArticlePost />
            <ArticlePost />
          </div>
          <Paging />
        </div>
      </div>
    </div>
  );
}

export default ArticleList;
