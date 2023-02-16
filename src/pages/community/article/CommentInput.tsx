import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaCaretRight } from 'react-icons/fa';
import CommentList from './CommentList';
import { BASE_URL, CBASE_URL } from '../../../config';
import './CommentInput.scss';
import { UserProps } from './Article';

function CommentInput(props: UserProps) {
  const {
    userName,
    profileImg,
    tier,
    isLogin,
    loadArticleComment,
    commentNum,
  } = props;
  const params = useParams<string>();
  const postId = params.id;
  const [comment, setComment] = useState('');

  // const token = localStorage.getItem('token');
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJzZWNyZXRPclByaXZhdGVLZXkiOiJnaXRfcmFuayIsImlhdCI6MTY3NjM2NDEyOSwiZXhwIjoxNjc2MzY1OTI5fQ.gDSClaASdaWssmretGzZAcf50a1EoTzJK_c7kb9uKxI`;
  const valid = comment ? false : true;

  const com = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  // 댓글 등록하기
  const handleComment = async () => {
    await axios
      .post(
        `${CBASE_URL}/community/posts/${postId}/comment`,
        { content: comment, groupOrder: commentNum + 1, depth: 1 },
        {
          headers: { Authorization: token },
        }
      )
      .then(res => {
        console.log(res);
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
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
                onChange={com}
              />
              <div className="enroll">
                <button
                  className={valid ? 'enrollBtn' : 'enrollBtn active'}
                  disabled={valid}
                  onClick={handleComment}
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
            <Link to="/login" className="goToLogin">
              로그인
            </Link>
            하세요
          </section>
        )}
      </div>
      {/* <CommentList /> */}
    </>
  );
}

export default CommentInput;
