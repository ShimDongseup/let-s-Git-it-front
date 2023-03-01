import React from 'react';
import { NewsProp } from '../../../../../@types/ArticleList';
import './articleNews.scss';

function ArticleNews({ newsList }: NewsProp) {
  return (
    <>
      {newsList.map((news, i) => {
        return (
          <div className="articleNews" key={i}>
            <a href={news.newsUrl} target="_blank" rel="noreferrer noopener">
              <div className="articleNewsInner">
                <div className="articleImgSize">
                  <img
                    src={news.imageUrl ? news.imageUrl : '../image/noimg.jpg'}
                    alt="newsImg"
                    className="newsThumbnail"
                  />
                </div>
                <div className="articleNewsFlex">
                  <h3 className="articleNewsTitle">{news.post_title}</h3>
                  <p className="articleNewsContent">{news.post_content}</p>
                  <p className="articleNewsTime">{news.createdAt}</p>
                </div>
              </div>
            </a>
          </div>
        );
      })}
    </>
  );
}

export default ArticleNews;
