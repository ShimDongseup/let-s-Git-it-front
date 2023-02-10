import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import { HiOutlineShare } from 'react-icons/hi';
import { AiOutlineAlert } from 'react-icons/ai';
import ArticleMenu from '../articleMenu/ArticleMenu';
import CommentInput from './CommentInput';
import './Article.scss';

type ArticleData = {
  id: number;
  title: string;
  content: string;
  userId: number;
  userName: string;
  subCategory: string;
  tier: string;
  createdAt: string;
  ifLiked: boolean;
  amIUser: boolean;
  like: LikeData[];
};

type LikeData = {
  likeId: number;
  userId: number;
  createdAt: string;
};

function Article() {
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [isCheckLikes, setIsCheckLikes] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [commentNum, setCommentNum] = useState(0);
  const postId = useParams<string>();
  const navi = useNavigate();
  const token = localStorage.getItem('token');

  // 게시글, 댓글 수 조회
  const loadArticle = (): void => {
    // `/community/posts/${postId}`
    axios.get('/data/article.json').then(res => {
      setArticle(res.data);
      setIsCheckLikes(res.data[0].ifLiked);
      setLikes(res.data[0].like.length);
    });

    axios.get('/data/comment.json').then(res => setCommentNum(res.data.length));
  };

  // 게시글 좋아요
  const clickThumbsUp = async () => {
    setIsCheckLikes(prev => !prev);
    if (isCheckLikes) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }

    await axios.post(`community/likes/${postId}`, {
      headers: {
        Authorization: token,
      },
      data: {
        likes: likes,
      },
    });
  };

  // 게시글 삭제하기
  const deleteArticle = () => {
    alert(`[${article[0].title}] 글을 삭제하시겠습니까?`);
    axios
      .delete(`/community/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => navi('/articleList'))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
<<<<<<< HEAD
    article[0] && (
      <div className="articlePage">
        <div className="listAndArticle">
          <ArticleMenu />
          <div className="articleWrap">
            <header className="headerWrap">
              <div className="titleWrap">
                <div className="title">{article[0].title}</div>
                <ul className={article[0].amIUser ? 'editDel' : 'none'}>
                  <li className="edit">수정</li>
                  <li className="del" onClick={deleteArticle}>
                    삭제
                  </li>
                </ul>
=======
    <div className="articlePage">
      <div className="listAndArticle">
        {/* <ArticleMenu /> */}
        <div className="articleWrap">
          <header className="headerWrap">
            <div className="title">제목제목제목제목</div>
            <div className="titleInner">
              <ul>
                <li className="category">카테고리</li>
                <li className="slash">|</li>
                <li className="date">2023.01.26</li>
                <li className="slash">|</li>
                <li className="writer">글쓴이</li>
              </ul>
            </div>
          </header>
          <main className="mainWrap">
            <div className="article">
              다 나는 별이 까닭입니다. 가을로 내 된 계절이 별들을 별 있습니다.
              그리고 청춘이 가난한 걱정도 프랑시스 이름자 버리었습니다. 별에도
              새겨지는 다 밤을 별 보고, 버리었습니다. 어머니 아스라히 별 릴케
              보고, 까닭입니다. 까닭이요, 이름을 노루, 아스라히 너무나 나는 차
              하나에 불러 계십니다. 헤는 이국 강아지, 가득 불러 내린 불러
              버리었습니다. 멀듯이, 오는 별 까닭입니다. 이런 봄이 오는 무엇인지
              이름과 노새, 했던 딴은 거외다. 별빛이 하나 없이 겨울이 하나에 벌써
              너무나 있습니다. 된 둘 경, 하나에 있습니다. <br />
              위에도 어머니, 불러 헤는 말 까닭입니다. 어머니 별에도 지나가는
              자랑처럼 오면 마디씩 가득 계십니다. 파란 가득 못 된 하나에 가난한
              있습니다. 아무 못 위에 강아지, 별 한 말 이름과 내일 있습니다. 불러
              책상을 헤일 소녀들의 위에도 릴케 북간도에 봅니다. 하늘에는
              북간도에 못 봅니다. 겨울이 별들을 무엇인지 봅니다. 하나 까닭이요,
              가득 밤이 별 아침이 겨울이 소학교 이네들은 까닭입니다. 까닭이요,
              이름과,
            </div>
            <section className="mainBottom">
              <div className="thumsCommentIcons">
                <div className="thumbsUpIcon">
                  <FiThumbsUp />
                  <span>33</span>
                </div>
                <div className="commentIcon">
                  <FaRegComment />
                  <span>15</span>
                </div>
>>>>>>> main
              </div>
              <div className="titleInner">
                <ul>
                  <li>{article[0].subCategory}</li>
                  <li className="slash">|</li>
                  <li>{article[0].createdAt}</li>
                  <li className="slash">|</li>
                  <li className="tier">{article[0]?.tier}</li>
                  <li>{article[0].userName}</li>
                </ul>
              </div>
            </header>
            <main className="mainWrap">
              <div className="article">{article[0].content}</div>
              <section className="mainBottom">
                <div className="thumsCommentIcons">
                  <div className="thumbsUpWrap">
                    {isCheckLikes ? (
                      <FaRegThumbsUp
                        className="thumbsUp"
                        onClick={clickThumbsUp}
                      />
                    ) : (
                      <FaThumbsUp
                        className="thumbsUp"
                        onClick={clickThumbsUp}
                      />
                    )}
                    <span>{likes}</span>
                  </div>
                  <div className="commentIconWrap">
                    <FaRegComment className="comment" />
                    <span>{commentNum}</span>
                  </div>
                </div>
                <div className="shareSirenIcons">
                  <HiOutlineShare className="share" />
                  <AiOutlineAlert className="siren" />
                </div>
              </section>
            </main>
            <CommentInput />
          </div>
        </div>
      </div>
    )
  );
}

export default Article;

const ARTICLE_DATA = [
  {
    id: 1,
    postId: 1,
    title: '글 제목',
    content:
      '다 나는 별이 까닭입니다.별에도 새겨지는 다 밤을 보고 버리었습니다. 어머니 아스라히 별 보고 까닭입니다. 파란 가득 못 된 하나에 가난한 강아지 별 한 말과 이름 내일 있습니다.',
    userName: 'kby0908',
    subCategory: '자유',
    createdAt: '2023-02-02',
    tier: 'tier',
    like: [
      {
        likeId: 1,
        userId: 1,
        createdAt: '2023-02-02',
      },
      {
        likeId: 2,
        userId: 2,
        createdAt: '2023-02-02',
      },
    ],
  },
];
