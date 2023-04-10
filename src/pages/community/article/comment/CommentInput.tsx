import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCaretRight } from 'react-icons/fa';
import Login from '../../../login/Login';
import { BASE_URL, HEADERS } from '../../../../config';
import { UserProps } from '../../../../../@types/Article';
import './CommentInput.scss';

function CommentInput(props: UserProps) {
  const { userName, profileImg, tier, isLogin, groupOrder, fetchComment } =
    props;

  const [comment, setComment] = useState<string>('');
  const [activeLogin, setActiveLogin] = useState<boolean>(false);

  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;
  const valid = comment ? false : true;
  const commentGroup = groupOrder !== undefined ? groupOrder + 1 : 0;

  useEffect(() => {
    console.log('commentInput 리렌더링!');
  }, []);

  // 댓글 등록하기
  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const addComment = () => {
    if (comment.replace(/\s/g, '') === '') {
      alert('댓글을 입력하세요');
    } else {
      axios
        .post(
          `${BASE_URL}/community/posts/${postId}/comment`,
          {
            content: comment,
            groupOrder: commentGroup,
            depth: 1,
          },
          HEADERS
        )
        .then(res => {
          setComment('');
          fetchComment();
        })
        .catch(err => console.log(err));
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

  // 유저 프로필로 이동
  const goToUserPropfile = () => {
    navi(`/userdetail/${userName}`);
  };

  return (
    <div className="commentInputPage">
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
          <Login active={activeLogin} setActiveLogin={setActiveLogin} />
          하세요
        </section>
      )}
    </div>
  );
}

export default CommentInput;
