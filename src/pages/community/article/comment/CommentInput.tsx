import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCaretRight } from 'react-icons/fa';
import Login from '../../../login/Login';
import { BASE_URL } from '../../../../config';
import { UserProps } from '../../../../../@types/Article';
import './CommentInput.scss';

function CommentInput(props: UserProps) {
  const {
    userName,
    profileImg,
    tier,
    isLogin,
    loadArticleComment,
    groupOrder,
  } = props;

  const [comment, setComment] = useState<string>('');
  const [activeLogin, setActivelogin] = useState<boolean>(false);

  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;
  const token = `Bearer ${localStorage.getItem('token')}`;
  const valid = comment ? false : true;
  const commentGroup = groupOrder !== undefined ? groupOrder + 1 : 0;

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  // 댓글 등록하기
  const addComment = async () => {
    await axios
      .post(
        `${BASE_URL}/community/posts/${postId}/comment`,
        { content: comment, groupOrder: commentGroup, depth: 1 },
        {
          headers: { Authorization: token },
        }
      )
      .then(res => {
        setComment('');
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  const goToUserPropfile = () => {
    navi(`/userdetail/${userName}`);
  };

  const openLogin = (): void => {
    setActivelogin(true);
  };

  const handleLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_REST_API_KEY}&redirect_uri=https://let-s-git-it.vercel.app/githublogin`;
  };

  return (
    <div className="commentPage">
      {isLogin ? (
        <>
          <section className="userInfo" onClick={goToUserPropfile}>
            <img className="profileImg" src={profileImg} alt="profile img" />
            <img src={`../image/${tier}.png`} className="tier" alt="tier" />
            <div className="userName">{userName}</div>
          </section>
          <div className="comment">
            <textarea
              className="commentInput"
              placeholder="댓글 남기기"
              onChange={handleComment}
              value={comment}
            />
            <div className="enroll">
              <button
                className={valid ? 'enrollBtn' : 'enrollBtn active'}
                disabled={valid}
                onClick={addComment}
              >
                등록
              </button>
            </div>
          </div>
        </>
      ) : (
        <section className="loginMsg">
          <FaCaretRight className="icon" />
          댓글을 남기시려면
          <div
            className="goToLogin"
            onClick={window.screen.width > 480 ? openLogin : handleLogin}
          >
            로그인
          </div>
          <Login active={activeLogin} setActiveLogin={setActivelogin} />
          하세요
        </section>
      )}
    </div>
  );
}

export default CommentInput;
