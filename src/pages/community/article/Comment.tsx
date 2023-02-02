import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCaretRight } from 'react-icons/fa';
import './Comment.scss';
import axios from 'axios';
import { useParams } from 'react-router';
import CommentList from './CommentList';

function Comment() {
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');
  const postId = useParams();
  const valid = comment ? false : true;

  // 댓글 등록하기
  const handleComment = async (e: any) => {
    setComment(e.target.value);

    await axios
      .post(`/community/posts/${postId}/comment`, {
        headers: { token: token },
        data: { comment: comment },
      })
      .then(res => alert('성공!'))
      .catch(err => alert(err));
  };

  console.log(comment);

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

export default Comment;
