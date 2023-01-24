import React from 'react';
import './articlePost.scss';

function ArticlePost() {
  return (
    <div className="articlePost">
      <div className="articleListProfile">
        <img src="./images/icon/bronze.png" alt="tier" />
        <span className="userProfileName">abcde</span>
        <span className="userPostTime">7시간 전</span>
      </div>
      <div className="articleListFlex">
        <div className="articleListContent">
          <p>
            글 정보(글 제목, 글id, 글 게시 시간, 글쓴이 이름, 글쓴이 티어, 댓글
            수 , 추천 수 )
          </p>
        </div>
        <div className="articleListReaction">
          <span>👍 100</span>
          <span>💬 90</span>
        </div>
      </div>
    </div>
  );
}

export default ArticlePost;
