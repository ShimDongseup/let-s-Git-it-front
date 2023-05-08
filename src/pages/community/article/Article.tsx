import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { FaRegThumbsUp, FaThumbsUp, FaRegComment } from 'react-icons/fa';
import ArticleMenu from '../articleMenu/ArticleMenu';
import Share from './Share';
import CommentInput from './comment/CommentInput';
import CommentList from './comment/CommentList';
import Login from '../../login/Login';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import { accessToken, categoryState, commentOption } from '../../../atom';
import { ArticleData, CommentData } from '../../../../@types/Article';
import './Article.scss';

function Article() {
  const [article, setArticle] = useState<ArticleData | null>(null);
  const [like, setLike] = useState({ count: 0, isLiked: false });
  const [commentList, setCommentList] = useState<CommentData[]>([]);
  const [activeLogin, setActiveLogin] = useState<boolean>(false);
  const checkActiveCategory = useSetRecoilState(categoryState);
  const [currentTab, setCurrentTab] = useRecoilState(commentOption);
  const token = useRecoilValue(accessToken);

  const commentNum = commentList.length;
  const reCommentNum = commentList
    .map(x => x.reComments.length)
    .reduce((a, b) => a + b, 0);
  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;

  // 게시글 조회
  const fetchArticle = async () => {
    try {
      const res = await axios.get(`/community/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticle(res.data);
      setLike({
        count: res.data.likes === null ? 0 : res.data.likes.length,
        isLiked: res.data.ifLiked,
      });
      checkActiveCategory(res.data.subCategoryId);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.status === 500) {
        navi('/noArticle');
      }
    }
  };

  // 댓글 조회
  const fetchComment = async () => {
    try {
      const res = await axios.get(`/community/posts/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCommentList(res.data.reverse());
    } catch (err) {
      console.log(err);
    }
  };

  // 로그인으로 이동
  const openLogin = (): void => {
    setActiveLogin(true);
  };

  const handleLogin = () => {
    localStorage.setItem('referrer', window.location.href);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_REST_API_KEY}&redirect_uri=https://let-s-git-it.vercel.app/githublogin`;
  };

  // 게시글 좋아요
  const clickThumbsUp = async () => {
    try {
      await axios.post(
        '/community/like',
        {
          postId: postId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchArticle();
    } catch (err) {
      console.log(err);
      if (!article?.isLogin) {
        alert('로그인이 필요한 서비스입니다');
        if (window.screen.width > 480) {
          openLogin();
        } else {
          handleLogin();
        }
      }
    }
  };

  // 게시글 삭제하기
  const deleteArticle = async () => {
    let text = `[${article?.postTitle}] 글을 삭제하시겠습니까?`;
    if (window.confirm(text)) {
      try {
        await axios.delete(`/community/posts/${postId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('정상적으로 삭제되었습니다');
        navi('/articleList/4?offset=0&limit=10&sort=latest');
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 게시글 수정
  const editArticle = () => {
    navi(`/articleModify/${postId}`);
  };

  // 게시글 작성자 페이지 이동
  const goToWriterProfile = () => {
    navi(`/userdetail/${article?.userName}`);
  };

  useEffect(() => {
    fetchArticle();
    fetchComment();
    setCurrentTab(0);
  }, []);

  return (
    article && (
      <div className="articlePage">
        <main className="listAndArticle">
          <aside className="listWrap">
            <ArticleMenu />
          </aside>
          <article className="articleWrap">
            <header className="headerWrap">
              <article className="titleWrap">
                <h1 className="title">{article.postTitle}</h1>
                <ul className={article.isAuthor ? 'editDel' : 'hidden'}>
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
                  <li className="category">{article.subCategoryName}</li>
                  <li className="slash1">|</li>
                  <li>{article.createdAt.slice(0, 10)}</li>
                  <li className="slash2">|</li>
                  <img
                    src={`../image/${article.tierName}.png`}
                    className="tier"
                    alt="tier"
                  />
                  <li className="writer" onClick={goToWriterProfile}>
                    {article.userName}
                  </li>
                </ul>
              </article>
            </header>
            <article className="mainWrap">
              <div className="article">
                <div dangerouslySetInnerHTML={{ __html: article.content }} />
              </div>
              <section className="mainBottom">
                <div className="thumsCommentIcons">
                  <div className="thumbsUpWrap">
                    {like.isLiked ? (
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
                          setActiveLogin={setActiveLogin}
                        />
                      </>
                    )}
                    <span>{like.count}</span>
                  </div>
                  <div className="commentIconWrap">
                    <FaRegComment />
                    <span>{commentNum + reCommentNum}</span>
                  </div>
                </div>
                <Share
                  postTitle={article.postTitle}
                  createdAt={article.createdAt}
                  userName={article.userName}
                />
              </section>
            </article>
            <CommentInput
              isLogin={article.isLogin}
              commentNum={commentNum}
              groupOrder={commentList[0]?.groupOrder}
              fetchComment={fetchComment}
            />
            <CommentList
              commentList={
                currentTab === 0
                  ? commentList
                  : [...commentList].sort((a, b) => b.likeNumber - a.likeNumber)
              }
              fetchComment={fetchComment}
            />
          </article>
        </main>
      </div>
    )
  );
}

export default React.memo(Article);
