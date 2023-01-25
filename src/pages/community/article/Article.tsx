import React from 'react';
import { FaRegComment, FaRegThumbsUp } from 'react-icons/fa';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { HiOutlineShare } from 'react-icons/hi';
import Comment from '../article/Comment';
import './Article.scss';

function Article() {
  return (
    <div className="articleWrap">
      <header className="headerWrap">
        <div className="title">제목제목제목제목</div>
        <div className="titleInner">
          <ul>
            <li className="category">카테고리 </li>
            <li className="date">3 시간 전</li>
            <li className="writer">글쓴이</li>
          </ul>
          {/* <ul>
            <li className="commentCount">댓글 13</li>
            <li className="likesCount">추천 27</li>
          </ul> */}
        </div>
      </header>
      <main className="mainWrap">
        <div className="article">
          다 나는 별이 까닭입니다. 가을로 내 된 계절이 별들을 별 있습니다.
          그리고 청춘이 가난한 걱정도 프랑시스 이름자 버리었습니다. 별에도
          새겨지는 다 밤을 별 보고, 버리었습니다. 어머니 아스라히 별 릴케 보고,
          까닭입니다. 까닭이요, 이름을 노루, 아스라히 너무나 나는 차 하나에 불러
          계십니다. 헤는 이국 강아지, 가득 불러 내린 불러 버리었습니다. 멀듯이,
          오는 별 까닭입니다. 이런 봄이 오는 무엇인지 이름과 노새, 했던 딴은
          거외다. 별빛이 하나 없이 겨울이 하나에 벌써 너무나 있습니다. 된 둘 경,
          하나에 있습니다. <br />
          위에도 어머니, 불러 헤는 말 까닭입니다. 어머니 별에도 지나가는
          자랑처럼 오면 마디씩 가득 계십니다. 파란 가득 못 된 하나에 가난한
          있습니다. 아무 못 위에 강아지, 별 한 말 이름과 내일 있습니다. 불러
          책상을 헤일 소녀들의 위에도 릴케 북간도에 봅니다. 하늘에는 북간도에 못
          봅니다. 겨울이 별들을 무엇인지 봅니다. 하나 까닭이요, 가득 밤이 별
          아침이 겨울이 소학교 이네들은 까닭입니다. 까닭이요, 이름과, 하늘에는
          봅니다. 보고, 된 써 어머니, 라이너 강아지, 멀리 봅니다. 이웃 애기
          하나에 가슴속에 별 이제 무덤 이네들은 봅니다. 부끄러운 그러나 이
          청춘이 오는 못 잔디가 비둘기, 나는 까닭입니다. 가득 소학교 내일 나의
          어머니, 버리었습니다. 때 애기 가득 아스라히 겨울이 까닭이요, 프랑시스
          마리아 거외다. 못 이름과, 까닭이요, 계절이 까닭입니다. 이름자를 내
          묻힌 하나에 이네들은 계십니다. 강아지, 소학교 가을로 별이 말
          까닭입니다. 벌써 노새, 토끼, 있습니다. 언덕 오면 라이너 계십니다. 이제
          하나에 너무나 별에도 내일 같이 않은 별 어머님, 버리었습니다. 별 아무
          밤이 하나에 토끼, 까닭입니다.
        </div>
        <section className="mainBottom">
          <div className="thumsCommentIcons">
            <div className="thumbsUpIcon">
              <FaRegThumbsUp />
              <span>33</span>
            </div>
            <div className="commentIcon">
              <FaRegComment />
              <span>15</span>
            </div>
          </div>
          <div className="shareDotIcons">
            <HiOutlineShare className="shareIcon" />
            <BiDotsHorizontalRounded />
          </div>
        </section>
      </main>
      <Comment />
    </div>
  );
}

export default Article;
