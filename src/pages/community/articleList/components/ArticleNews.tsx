import React from 'react';
import './articleNews.scss';

function ArticleNews() {
  return (
    <div className="articleNews">
      <a
        href="https://www.itworld.co.kr/mainnews/274585"
        target="_blank"
        rel="noreferrer noopener"
      >
        <div className="articleNewsInner">
          <div className="articleImgSize">
            <img
              src="./images/icon/newsImg.jpg"
              alt="newsImg"
              className="newsThumbnail"
            />
          </div>
          <div className="articleNewsFlex">
            <h3 className="articleNewsTitle">
              개발 뉴스 제목.. 말줄임표 테스트하기 위하여 제목을 길게 적고
              있습니다
            </h3>
            <p className="articleNewsContent">
              여기에는 뉴스에 대한 내용 한 두줄? 정도를 기입하여 카드의 크기를
              다른 커뮤니티 리스트보다 좀 더 크게 하고자 합니다. 이 다음은 말
              줄임표?
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}

export default ArticleNews;
