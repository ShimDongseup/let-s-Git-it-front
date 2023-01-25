import React from 'react';
import './CommentList.scss';

const CommentList = () => {
  return (
    <div className="commentList">
      {COMMENT_DATAS.map(data => {
        return (
          <div className="comment" key={data.id}>
            <section className="userInfo">
              <img className="profileImg" src={data.img} alt="profile img" />
              <div className="infoContent">
                <div className="userName">{data.name}</div>
                <div className="time">3시간 전</div>
              </div>
            </section>
            <div className="content">{data.content}</div>
          </div>
        );
      })}
    </div>
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
  {
    id: 4,
    name: 'dddddd',
    img: 'https://dimg.donga.com/wps/NEWS/IMAGE/2022/01/28/111500268.2.jpg',
    content: '이력서 쓰기 싫다..',
  },
];
