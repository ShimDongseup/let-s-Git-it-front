import React from 'react';
import { useState, useEffect } from 'react';
import ArticleMenu from '../articleMenu/ArticleMenu';
import ArticlePost from './components/ArticlePost';
import Paging from './components/Paging';
import './articleList.scss';

function ArticleList() {
  type Article = {
    id: number;
    title: string;
    postTime: string;
    userName: string;
    image: string;
    commentNum: number;
    recommendNum: number;
    category: string;
  };
  const [articleList, setArticleList] = useState<Article[]>([]);
  const articleFetch = () => {
    fetch('./data/post.json')
      .then(res => res.json())
      .then(data => setArticleList(data));
  };
  useEffect(() => {
    // articleFetch();
  }, []);

  return (
    <div className="community">
      <div className="articleInner">
        <ArticleMenu />
        <div className="articleList">
          <div className="articleListSort">
            <span>최근</span>
            <span>인기</span>
          </div>
          <div className="articleListInner">
            {articleList.length === 0 ? (
              <div className="noList">게시물이 없습니다.</div>
            ) : (
              articleList.map((article, i) => {
                return <ArticlePost key={i} article={article} />;
              })
            )}
          </div>
          <Paging />
        </div>
      </div>
    </div>
  );
}

export default ArticleList;
