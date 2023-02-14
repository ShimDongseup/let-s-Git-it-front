import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCaretRight } from 'react-icons/fa';
import CommentList from './CommentList';
import { BASE_URL, CBASE_URL } from '../../../config';
import './CommentInput.scss';

function CommentInput() {
  const [comment, setComment] = useState('');
  const postId = useParams();
  const token = localStorage.getItem('token');
  const valid = comment ? false : true;

  // 댓글 등록하기
  const handleComment = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    await axios
      .post(`${CBASE_URL}/community/posts/${postId}/comment`, {
        headers: { Authorization: token },
        data: { content: comment },
      })
      .then(res => console.log('성공'))
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="commentPage">
        {!token ? (
          <>
            <section className="userInfo">
              <img
                className="profileImg"
                src="https://cdn.pixabay.com/photo/2014/08/10/08/17/dog-414570__480.jpg"
                alt="profile img"
              />
              <div className="tier">Tier</div>
              <div className="userName">김보윤</div>
            </section>
            <form className="comment">
              <textarea
                className="commentInput"
                placeholder="댓글 남기기"
                onChange={handleComment}
              />
              <div className="enroll">
                <button
                  className={!valid ? 'enrollBtn active' : 'enrollBtn'}
                  disabled={valid}
                >
                  등록
                </button>
              </div>
            </form>
          </>
        ) : (
          <section className="loginMsg">
            <FaCaretRight className="icon" />
            댓글을 남기시려면
            <Link to="/login" className="goToLogin">
              로그인
            </Link>
            하세요
          </section>
        )}
      </div>
      <CommentList />
    </>
  );
}

export default CommentInput;
