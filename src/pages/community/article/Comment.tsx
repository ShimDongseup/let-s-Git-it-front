import React from 'react';
import './Comment.scss';

function Comment() {
  return (
    <div className="commentPage">
      <section className="userInfo">
        <img
          className="profileImg"
          src="https://cdn.pixabay.com/photo/2014/08/10/08/17/dog-414570__480.jpg"
          alt="profile img"
        />
        <div className="userName">김보윤</div>
      </section>
      <form className="comment">
        <textarea className="commentInput" placeholder="댓글 남기기" />
        <div className="enroll">
          <button className="enrollBtn">등록</button>
        </div>
      </form>
    </div>
  );
}

export default Comment;
