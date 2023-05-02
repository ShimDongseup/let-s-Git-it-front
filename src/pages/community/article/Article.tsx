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
import { useSetRecoilState, useRecoilState } from 'recoil';
import { categoryState, commentOption } from '../../../atom';
import { ArticleData, CommentData, UserData } from '../../../../@types/Article';
import './Article.scss';

function Article() {
  const [article, setArticle] = useState<ArticleData[]>([]);
  const [isCheckLikes, setIsCheckLikes] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(0);
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [userInfo, setUserInfo] = useState<UserData[]>([]);
  const [activeLogin, setActivelogin] = useState<boolean>(false);
  const checkActiveCategory = useSetRecoilState(categoryState);
  const [currentTab, setCurrentTab] = useRecoilState(commentOption);

  const commentNum = commentList.length;
  const reCommentNum = commentList
    .map(x => x.reComments.length)
    .reduce((a, b) => a + b, 0);
  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;

  // 게시글, 댓글 수 조회
  const loadArticleComment = async () => {
    await axios
      .get(`/community/posts/${postId}`, HEADERS)
      .then(res => {
        setArticle([res.data]);
        setIsCheckLikes(res.data.ifLiked);
        setLikes(res.data.likes === null ? 0 : res.data.likes.length);
        checkActiveCategory(article[0]?.subCategoryId);
      })
      .catch(err => {
        if (err?.response.status === 500) {
          navi('/noArticle');
        }
      });

    // 댓글 조회
    await axios
      .get(`/community/posts/${postId}/comments`, HEADERS)
      .then(res => {
        setCommentList(res.data.reverse());
      });

    // 유저 정보 조회
    await axios.get(`/user`, HEADERS).then(res => setUserInfo([res.data]));
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
        `/community/like`,
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
          alert('로그인이 필요한 서비스입니다');
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
        .delete(`/community/posts/${postId}`, HEADERS)
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
    setCurrentTab(0);
  }, []);

  return (
    article[0] && (
      <div className="articlePage">
        <main className="listAndArticle">
          <aside className="listWrap">
            <ArticleMenu />
          </aside>
          <article className="articleWrap">
            <header className="headerWrap">
              <article className="titleWrap">
                <h1 className="title">{article[0].postTitle}</h1>
                <ul className={article[0].isAuthor ? 'editDel' : 'hidden'}>
                  <li className="edit" onClick={editArticle}>
                    수정
                  </li>
                  <li className="del" onClick={deleteArticle}>
                    삭제
                  </li>
                </ul>
              </article>
              <article className="titleInner">
                <ul>
                  <li className="category">{article[0].subCategoryName}</li>
                  <li className="slash1">|</li>
                  <li>{article[0].createdAt.slice(0, 10)}</li>
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
              </article>
            </header>
            <article className="mainWrap">
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
                <Share
                  postTitle={article[0].postTitle}
                  createdAt={article[0].createdAt}
                  userName={article[0].userName}
                />
              </section>
            </article>
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
              commentList={
                currentTab === 0
                  ? commentList
                  : [...commentList].sort((a, b) => b.likeNumber - a.likeNumber)
              }
              loadArticleComment={loadArticleComment}
            />
          </article>
        </main>
      </div>
    )
  );
}

export default Article;
