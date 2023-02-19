import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import ArticleMenu from '../articleMenu/ArticleMenu';
import Share from './Share';
import CommentInput from './comment/CommentInput';
import CommentList from './comment/CommentList';
import { ArticleData, CommentData } from '../../../../@types/Article';
import { BASE_URL } from '../../../config';
import './Article.scss';

function Article() {
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [isCheckLikes, setIsCheckLikes] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [commentNum, setCommentNum] = useState<number>(0);
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [copyCommentList, setCopyCommentList] = useState<CommentData[]>([]);

  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;
  const token = `Bearer ${localStorage.getItem('token')}`;

  // 게시글, 댓글 수 조회
  const loadArticleComment = async () => {
    await axios
      .get(`${BASE_URL}/community/posts/${postId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log('이거', res);
        setArticle([res.data]);
        setIsCheckLikes(res.data.ifLiked);
        setLikes(res.data.likes === null ? 0 : res.data.likes.length);
      })
      .catch(err => {
        if (err.response.status === 500) {
          navi('/noArticle');
        }
      });

    //댓글조회
    await axios
      .get(`${BASE_URL}/community/posts/${postId}/comments`, {
        headers: {
          Authorization: token,
        },
      })
      .then(res => {
        console.log(res.data.reverse());
        setCommentList(res.data.reverse());
        setCopyCommentList(res.data.reverse());
        setCommentNum(res.data.length);
      });
  };

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
            Authorization: token,
          },
        }
      )
      .then(res => {
        console.log(res);
        loadArticleComment();
      })
      .catch(err => {
        if (!article[0].isLogin) {
          alert('로그인하세요!');
          navi('/githublogin');
        }
      });
  };

  // 게시글 삭제하기
  const deleteArticle = () => {
    alert(`[${article[0].postTitle}] 글을 삭제하시겠습니까?`);
    axios
      .delete(`${BASE_URL}/community/posts/${postId}`, {
        headers: {
          Authorization: token,
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
    loadArticleComment();
  }, []);

  return (
    article[0] && (
      <div className="articlePage">
        <div className="listAndArticle">
          {/* <ArticleMenu /> */}
          <div className="articleWrap">
            <header className="headerWrap">
              <div className="titleWrap">
                <div className="title">{article[0].postTitle}</div>
                <ul className={article[0].isAuthor ? 'editDel' : 'none'}>
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
                  <li className="tier">{article[0].tierId}</li>
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
            <CommentInput
              userName={article[0].userName}
              profileImg={article[0].userProfileImage}
              tier={article[0].tierId}
              isLogin={article[0].isLogin}
              loadArticleComment={loadArticleComment}
              commentNum={commentNum}
            />
            <CommentList
              commentList={commentList}
              setCommentList={setCommentList}
              copyCommentList={copyCommentList}
              loadArticleComment={loadArticleComment}
            />
          </div>
        </div>
      </div>
    )
  );
}

export default Article;
