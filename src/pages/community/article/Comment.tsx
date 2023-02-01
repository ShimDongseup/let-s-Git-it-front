import React from 'react';
import { Link } from 'react-router-dom';
import { FaCaretRight } from 'react-icons/fa';
import './Comment.scss';

function Comment() {
  const token = localStorage.getItem('token');

  return (
    <div className="commentPage">
      {token ? (
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
            <textarea className="commentInput" placeholder="댓글 남기기" />
            <div className="enroll">
              <button className="enrollBtn">등록</button>
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
  );
}

export default Comment;
