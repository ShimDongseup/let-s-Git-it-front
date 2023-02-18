import React from 'react';
import { FaRegComment } from 'react-icons/fa';
import { FiThumbsUp, FiCornerDownRight } from 'react-icons/fi';
import './CommentList.scss';

const CommentList = () => {
  return (
    <>
      <nav className="filterWrap">
        <div className="new">최신순</div>
        <div className="likes">인기순</div>
      </nav>
      <div className="commentList">
        {COMMENT_DATAS.map(data => {
          return (
            <>
              <div className="comment" key={data.id}>
                <section className="userInfo">
                  <img
                    className="profileImg"
                    src={data.img}
                    alt="profile img"
                  />
                  <ul className="infoContent">
                    <li className="tier">Tier</li>
                    <li className="userName">{data.name}</li>
                    <li className="time">3시간 전</li>
                    <li className="deleteBtn">삭제</li>
                  </ul>
                </section>
                <div className="content">{data.content}</div>
              </div>
              <section className="reComHeader">
                <FiThumbsUp />
                <span>1</span>
                <div className="reComBtn">
                  <FaRegComment />
                  <span>댓글 달기</span>
                </div>
              </section>
              <div className="writeReCom">
                <FiCornerDownRight className="writeReComIcon" />
                <form className="reComForm">
                  <textarea className="reCom" placeholder="댓글 남기기" />
                  <div className="enroll">
                    <button className="enrollBtn">등록</button>
                  </div>
                </form>
              </div>
              {RECOMMENT_DATAS.map(data => {
                return (
                  <main className="reCommentSection" key={data.id}>
                    <FiCornerDownRight className="arrowIcon" />
                    <div className="reCommentWrap">
                      <div className="reComment">
                        <div className="tier">Tier</div>
                        <div className="reComId">{data.userId}</div>
                        <div className="reComDeleteBtn">삭제</div>
                      </div>
                      <div className="reComContent">{data.comment}</div>
                    </div>
                  </main>
                );
              })}
            </>
          );
        })}
      </div>
    </>
  );
};

export default CommentList;

const COMMENT_DATAS = [
  {
    id: 1,
    name: 'dddddd',
    img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    content: '맞아요.. 요즘 채용시장이 많이 얼어붙었더라구요.. 화이팅해요',
  },
  {
    id: 2,
    name: 'dddddd',
    img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    content: '화이팅',
  },
  {
    id: 3,
    name: 'dddddd',
    img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    content: '저도 요즘 공부하기 싫어요ㅜㅠㅠㅠ',
  },
];

const RECOMMENT_DATAS = [
  {
    id: 1,
    userId: 'qwer2324',
    comment: '그러게요..',
  },
  {
    id: 2,
    userId: 'ppp2dkc@gmail.com',
    comment: '쉽지 않네요',
  },
  {
    id: 3,
    userId: '33rerc@naver.com',
    comment: '요즘 경제가 안좋아서 쉽지않네요. 화이팅해요 우리!!',
  },
];
