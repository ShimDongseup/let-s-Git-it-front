import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import ArticleMenu from '../articleMenu/ArticleMenu';
import Share from './Share';
import CommentInput from './comment/CommentInput';
import CommentList from './comment/CommentList';
import Login from '../../login/Login';
import { BASE_URL, HEADERS } from '../../../config';
import { ArticleData, CommentData, UserData } from '../../../../@types/Article';
import './Article.scss';
import { useSetRecoilState } from 'recoil';
import { categoryState } from '../../../atom';

function Article() {
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [isCheckLikes, setIsCheckLikes] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [copyCommentList, setCopyCommentList] = useState<CommentData[]>([]);
  const [userInfo, setUserInfo] = useState<UserData[]>([]);
  const [activeLogin, setActivelogin] = useState<boolean>(false);

  const commentNum = commentList.length;
  const reCommentNum = commentList
    .map(x => x.reComments.length)
    .reduce((a, b) => a + b, 0);
  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;
  const checkActiveCategory = useSetRecoilState(categoryState);

  // 게시글, 댓글 수 조회
  const loadArticleComment = async () => {
    await axios
      .get(`${BASE_URL}/community/posts/${postId}`, HEADERS)
      .then(res => {
        setArticle([res.data]);
        setIsCheckLikes(res.data.ifLiked);
        setLikes(res.data.likes === null ? 0 : res.data.likes.length);
        checkActiveCategory(article[0].subCategoryId);
      })
      .catch(err => {
        if (err.response.status === 500) {
          navi('/noArticle');
        }
      });

    //댓글조회
    await axios
      .get(`${BASE_URL}/community/posts/${postId}/comments`, HEADERS)
      .then(res => {
        console.log(res.data.reverse());
        setCommentList(res.data.reverse());
        setCopyCommentList(res.data.reverse());
      });

    // 유저 정보 조회
    await axios
      .get(`${BASE_URL}/user`, HEADERS)
      .then(res => setUserInfo([res.data]));
  };

  // 로그인으로 이동
  const openLogin = (): void => {
    setActivelogin(true);
  };

  const handleLogin = () => {
    localStorage.setItem('referrer', window.location.href);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_REST_API_KEY}&redirect_uri=https://let-s-git-it.vercel.app/githublogin`;
  };

  // 게시글 좋아요
  const clickThumbsUp = () => {
    axios
      .post(
        `${BASE_URL}/community/like`,
        {
          postId: postId,
        },
        HEADERS
      )
      .then(res => {
        loadArticleComment();
      })
      .catch(err => {
        if (!article[0].isLogin) {
          alert('로그인하세요!');
          if (window.screen.width > 480) {
            openLogin();
          } else {
            handleLogin();
          }
        }
      });
  };

  // 게시글 삭제하기
  const deleteArticle = () => {
    let text = `[${article[0].postTitle}] 글을 삭제하시겠습니까?`;
    if (window.confirm(text)) {
      axios
        .delete(`${BASE_URL}/community/posts/${postId}`, HEADERS)
        .then(res => {
          alert('정상적으로 삭제되었습니다');
          navi('/articleList/4?offset=0&limit=10&sort=latest');
        })
        .catch(err => console.log(err));
    }
  };

  // 게시글 수정
  const editArticle = () => {
    navi(`/articleModify/${postId}`);
  };

  // 게시글 작성자 페이지 이동
  const goToWriterProfile = () => {
    navi(`/userdetail/${article[0].userName}`);
  };

  useEffect(() => {
    loadArticleComment();
  }, []);

  return (
    article[0] && (
      <div className="articlePage">
        <div className="listAndArticle">
          <div className="listWrap">
            <ArticleMenu />
          </div>
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
                  <li className="category">{article[0].subCategoryName}</li>
                  <li className="slash1">|</li>
                  <li>{article[0].createdAt}</li>
                  <li className="slash2">|</li>
                  <img
                    src={`../image/${article[0].tierName}.png`}
                    className="tier"
                    alt="tier"
                  />
                  <li className="writer" onClick={goToWriterProfile}>
                    {article[0].userName}
                  </li>
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
                      <>
                        <FaRegThumbsUp
                          className="thumbsUp"
                          onClick={clickThumbsUp}
                        />
                        <Login
                          active={activeLogin}
                          setActiveLogin={setActivelogin}
                        />
                      </>
                    )}
                    <span>{likes}</span>
                  </div>
                  <div className="commentIconWrap">
                    <FaRegComment />
                    <span>{commentNum + reCommentNum}</span>
                  </div>
                </div>
                <Share />
              </section>
            </main>
            <CommentInput
              userName={userInfo[0]?.userName}
              profileImg={userInfo[0]?.profileImageUrl}
              tier={userInfo[0]?.tierName}
              isLogin={article[0].isLogin}
              commentNum={commentNum}
              groupOrder={commentList[0]?.groupOrder}
              loadArticleComment={loadArticleComment}
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
