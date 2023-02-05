import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import { HiOutlineShare } from 'react-icons/hi';
import { AiOutlineAlert } from 'react-icons/ai';
import Comment from '../article/Comment';
import ArticleMenu from '../articleMenu/ArticleMenu';
import './Article.scss';

type ArticleData = {
  id: number;
  title: string;
  content: string;
  userName: string;
  subCategory: string;
  tier: string;
  createdAt: string;
  ifLiked: boolean;
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
    axios
      .delete(`/community/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => alert('삭제하시겠습니까?'))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    article[0] && (
      <div className="articlePage">
        <div className="listAndArticle">
          <ArticleMenu />
          <div className="articleWrap">
            <header className="headerWrap">
              <div className="titleWrap">
                <div className="title">{article[0].title}</div>
                <ul className="editDel">
                  <li className="edit">수정</li>
                  <li className="del" onClick={deleteArticle}>
                    삭제
                  </li>
                </ul>
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
            <Comment />
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
