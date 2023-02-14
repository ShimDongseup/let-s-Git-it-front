import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import ArticleMenu from '../articleMenu/ArticleMenu';
import Share from './Share';
import CommentInput from './CommentInput';
import { BASE_URL } from '../../../config';
import './Article.scss';

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
  login: boolean;
  likes: LikesData[] | null;
};

type LikesData = {
  likeId: number;
  userId: number;
  createdAt: string;
};

function Article() {
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [isCheckLikes, setIsCheckLikes] = useState<boolean>(false);
  const [likes, setLikes] = useState(0);
  const [commentNum, setCommentNum] = useState(0);
  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;
  const token = localStorage.getItem('token');

  // 게시글, 댓글 수 조회
  const loadArticle = async () => {
    // `${BASE_URL}/community/posts/${postId}`
    // '/data/article.json'
    await axios
      .get(`${BASE_URL}/community/posts/${postId}`, {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInNlY3JldE9yUHJpdmF0ZUtleSI6ImdpdF9yYW5rIiwiaWF0IjoxNjc2MTkzNzA0LCJleHAiOjE2NzYxOTU1MDR9.xLr7xSuG4LebCUWZFt35Ii47DABP8zcQGCokfbkOIa8',
        },
      })
      .then(res => {
        setArticle([res.data]);
        setIsCheckLikes(res.data.ifLiked);
        setLikes(res.data.likes.length);
      });

    // `${CBASE_URL}/community/posts/${postId}/comments`
    axios
      .get('/data/comment.json')
      .then(res => setCommentNum(res.data[0].data.length));
  };
  console.log(article[0]);
  // 게시글 좋아요
  const clickThumbsUp = async () => {
    await axios
      .post(
        `${BASE_URL}/community/like`,
        {
          postId: postId,
        },
        {
          headers: {
            Authorization:
              'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInNlY3JldE9yUHJpdmF0ZUtleSI6ImdpdF9yYW5rIiwiaWF0IjoxNjc2MTkzNzA0LCJleHAiOjE2NzYxOTU1MDR9.xLr7xSuG4LebCUWZFt35Ii47DABP8zcQGCokfbkOIa8',
          },
        }
      )
      .then(res => {
        console.log(res.data.message);
        loadArticle();
      })
      .catch(err => console.log(err.message));
  };

  // 게시글 삭제하기
  const deleteArticle = () => {
    alert(`[${article[0].post_title}] 글을 삭제하시겠습니까?`);
    axios
      .delete(`${BASE_URL}/community/posts/${postId}`, {
        headers: {
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInNlY3JldE9yUHJpdmF0ZUtleSI6ImdpdF9yYW5rIiwiaWF0IjoxNjc2MTkzNzA0LCJleHAiOjE2NzYxOTU1MDR9.xLr7xSuG4LebCUWZFt35Ii47DABP8zcQGCokfbkOIa8',
        },
      })
      .then(res => {
        alert('정상적으로 삭제되었습니다');
        navi('/articleList');
      })
      .catch(err => console.log(err));
  };

  // 게시글 수정
  const editArticle = () => {
    navi(`/articleModify/${postId}`);
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
                <ul className={article[0].login ? 'editDel' : 'none'}>
                  <li className="edit" onClick={editArticle}>
                    수정
                  </li>
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
                      <FaThumbsUp
                        className="thumbsUp"
                        onClick={clickThumbsUp}
                      />
                    ) : (
                      <FaRegThumbsUp
                        className="thumbsUp"
                        onClick={clickThumbsUp}
                      />
                    )}
                    <span>{likes}</span>
                  </div>
                  <div className="commentIconWrap">
                    <FaRegComment />
                    <span>{commentNum}</span>
                  </div>
                </div>
                <Share />
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
