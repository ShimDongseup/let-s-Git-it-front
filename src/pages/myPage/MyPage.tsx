import React from 'react';
import { Link } from 'react-router-dom';
import './MyPage.scss';

function MyPage() {
  return (
    <div className="wrapper">
      <div className="wrapMyPage">
        <div className="profileCard">프로필카드</div>
        <div className="wrapRight">
          <div className="choice">
            <h2 className="choiceTitle">개발분야</h2>
            <div className="choiceChange">
              <div className="choiceMenu">
                <div className="selected">
                  프론트엔드
                  <div className="downIcon material-symbols-outlined">
                    expand_more
                  </div>
                </div>
                <ul className="dropDown">
                  <li>백엔드</li>
                  <li>안드로이드</li>
                  <li>ios</li>
                </ul>
              </div>
              <button>수정</button>
            </div>
          </div>
          <div className="choice">
            <h2 className="choiceTitle">경력</h2>
            <div className="choiceChange">
              <div className="choiceMenu">
                <div className="selected">
                  학생
                  <div className="downIcon material-symbols-outlined">
                    expand_more
                  </div>
                </div>
                <ul className="dropDown">
                  <li>신입</li>
                  <li>1년차</li>
                  <li>2년차</li>
                  <li>3년차</li>
                </ul>
              </div>
              <button>수정</button>
            </div>
          </div>
          <div className="myArticleList">
            <h2>내가 작성한 글 목록</h2>
            <ul className="articleList">
              <li>
                <Link className="articleItem" to={`/article/1`}>
                  <div className="articleNum">1</div>
                  <div className="articleInfo">
                    <div className="articleTitle">
                      취업 꿀팁 (이력서 쓰는법 ,자소서 쓰는법, 기술스택 등등)
                      <span className="commentNum">[3]</span>
                    </div>
                    <div className="info">
                      <div className="category">자유 |</div>
                      <div className="time">2일 전</div>
                    </div>
                  </div>
                  <div className="recommend">
                    <span className="material-symbols-outlined up">
                      arrow_drop_up
                    </span>
                    243
                  </div>
                </Link>
              </li>
              <li>
                <Link className="articleItem" to={'/article/2'}>
                  <div className="articleNum">2</div>
                  <div className="articleInfo">
                    <div className="articleTitle">
                      취업 꿀팁 (이력서 쓰는법 ,자소서 쓰는법, 기술스택 등등)
                      <span className="commentNum">[3]</span>
                    </div>
                    <div className="info">
                      <div className="category">자유 |</div>
                      <div className="time">2일 전</div>
                    </div>
                  </div>
                  <div className="recommend">
                    <span className="material-symbols-outlined up">
                      arrow_drop_up
                    </span>
                    243
                  </div>
                </Link>
              </li>
              <li>
                <Link className="articleItem" to={'/article/3'}>
                  <div className="articleNum">3</div>
                  <div className="articleInfo">
                    <div className="articleTitle">
                      취업 꿀팁 (이력서 쓰는법 ,자소서 쓰는법, 기술스택 등등)
                      <span className="commentNum">[3]</span>
                    </div>
                    <div className="info">
                      <div className="category">자유 |</div>
                      <div className="time">2일 전</div>
                    </div>
                  </div>
                  <div className="recommend">
                    <span className="material-symbols-outlined up">
                      arrow_drop_up
                    </span>
                    243
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
