import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCaretRight } from 'react-icons/fa';
import { UserProps } from '../../../../../@types/Article';
import { BASE_URL } from '../../../../config';
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

  return (
    <div className="commentPage">
      {isLogin ? (
        <>
          <section className="userInfo">
            <img className="profileImg" src={profileImg} alt="profile img" />
            <div className="tier">{tier}</div>
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
          <Link to="/githublogin" className="goToLogin">
            로그인
          </Link>
          하세요
        </section>
      )}
    </div>
  );
}

export default CommentInput;
