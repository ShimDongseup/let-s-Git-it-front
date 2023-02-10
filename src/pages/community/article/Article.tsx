import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { RWebShare } from 'react-web-share';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import { HiOutlineShare } from 'react-icons/hi';
import { AiOutlineAlert } from 'react-icons/ai';
import ArticleMenu from '../articleMenu/ArticleMenu';
import CommentInput from './CommentInput';
import './Article.scss';
import { BASE_URL } from '../../../config';
import { CLOSING } from 'ws';

type ArticleData = {
  id: number;
  post_title: string;
  content: string;
  userId: number;
  userName: string;
  subCategoryName: string;
  tier: string;
  createdAt: string;
  ifLiked: boolean;
  amIUser: boolean;
  likes: LikesData[];
};

type LikesData = {
  likeId: number;
  userId: number;
  createdAt: string;
};

function Article() {
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [isCheckLikes, setIsCheckLikes] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [commentNum, setCommentNum] = useState(0);
  const params = useParams<string>();
  const postId = params.id;
  const navi = useNavigate();
  const token = localStorage.getItem('token');

  // 게시글, 댓글 수 조회
  const loadArticle = (): void => {
    // `/community/posts/${postId}`
    // /data/article.json
    axios
      .get(`${BASE_URL}/community/posts/${postId}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        setArticle([res.data]);
        setIsCheckLikes(true);
        setLikes(article[0].likes.length);
      });

    axios.get('/data/comment.json').then(res => setCommentNum(res.data.length));
  };
  console.log(article);
  // 게시글 좋아요
  const clickThumbsUp = async () => {
    setIsCheckLikes(prev => !prev);
    if (isCheckLikes) {
      setLikes(likes + 1);
    } else {
      setLikes(likes - 1);
    }

    await axios.post(`/community/likes/${postId}`, {
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
    alert(`[${article[0].post_title}] 글을 삭제하시겠습니까?`);
    axios
      .delete(`/community/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => navi('/articleList'))
      .catch(err => console.log(err));
  };

  const handleShare = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('클립보드에 링크가 복사되었습니다.');
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  useEffect(() => {
    loadArticle();
  }, []);

  return (
    article[0] && (
      <div className="articlePage">
        <div className="listAndArticle">
          {/* <ArticleMenu /> */}
          <div className="articleWrap">
            <header className="headerWrap">
              <div className="titleWrap">
                <div className="title">{article[0].post_title}</div>
                <ul className={article[0].amIUser ? 'editDel' : 'none'}>
                  <li className="edit">수정</li>
                  <li className="del" onClick={deleteArticle}>
                    삭제
                  </li>
                </ul>
              </div>
              <div className="titleInner">
                <ul>
                  <li>{article[0].subCategoryName}</li>
                  <li className="slash">|</li>
                  <li>{article[0].createdAt}</li>
                  <li className="slash">|</li>
                  <li className="tier">{article[0].tier}</li>
                  <li>{article[0].userName}</li>
                </ul>
              </div>
            </header>
            <main className="mainWrap">
              <div className="article">
                <div dangerouslySetInnerHTML={{ __html: article[0].content }} />
              </div>
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
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScpWOKF8SGFCZn8X8JQeDY0es-iuySbvZRBkf_-N9J_To6Eww/viewform?usp=sf_link"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <AiOutlineAlert className="siren" />
                  </a>
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
