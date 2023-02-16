import React, { useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import ReComment from './ReComment';
import { CommentProps } from './Article';
import { BASE_URL, CBASE_URL } from '../../../config';
import './Comment.scss';
import CommentLikes from './CommentLikes';

const Comment = (props: CommentProps) => {
  const {
    comment: {
      commentId,
      userName,
      profileImageUrl,
      content,
      tier,
      createdAt,
      likeNumber,
      isCreatedByUser,
      isLikedByUser,
      reComments,
    },
    loadArticleComment,
    isLike,
  } = props;

  // const [isComLikes, setIsComLikes] = useState<boolean>(isLikedByUser);
  const [reComOpen, setReComOpen] = useState<boolean>(false);
  // const token = localStorage.getItem('token');
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJzZWNyZXRPclByaXZhdGVLZXkiOiJnaXRfcmFuayIsImlhdCI6MTY3NjM2NDEyOSwiZXhwIjoxNjc2MzY1OTI5fQ.gDSClaASdaWssmretGzZAcf50a1EoTzJK_c7kb9uKxI`;

  // 댓글 좋아요
  const clickIcon = async () => {
    await axios
      .post(`${CBASE_URL}/community/comments/${commentId}/likes`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  // 댓글 삭제
  const deleteComment = () => {
    alert('댓글을 삭제하시겠습니까?');
    axios
      .delete(`${CBASE_URL}/community/comments/${commentId}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  // 대댓글 토글
  const toggleReCom = () => {
    setReComOpen(prev => !prev);
  };

  return (
    <div key={commentId}>
      <div className="comment">
        <section className="userInfo">
          <img className="profileImg" src={profileImageUrl} alt="profile img" />
          <ul className="infoContent">
            <li className="tier">{tier}</li>
            <li className="userName">{userName}</li>
            <li className="time">{createdAt}</li>
          </ul>
          <div
            className={isCreatedByUser ? 'deleteBtn' : ''}
            onClick={() => deleteComment()}
          >
            삭제
          </div>
        </section>
        <div className="content">{content}</div>
      </div>
      <section className="reComHeader">
        <div className="thumbsUpWrap">
          {isLike ? (
            <FaThumbsUp className="thumbsUp" onClick={() => clickIcon()} />
          ) : (
            <FaRegThumbsUp className="thumbsUp" onClick={() => clickIcon()} />
          )}
          {/* <CommentLikes isLikedByUser={isLikedByUser} clickIcon={clickIcon} /> */}
        </div>
        <span>{likeNumber}</span>
        <div className="reComBtn" onClick={() => toggleReCom()}>
          <FaRegComment />
          <span>댓글 보기</span>
        </div>
      </section>
      <div className={reComOpen ? '' : 'hidden'}>
        <div className={token ? 'writeReCom' : 'hidden'}>
          <FiCornerDownRight className="writeReComIcon" />
          <form className="reComForm">
            <textarea className="reCom" placeholder="댓글 남기기" />
            <div className="enroll">
              <button className="enrollBtn">등록</button>
            </div>
          </form>
        </div>
        {reComments.map(data => {
          return (
            <ReComment
              key={data.reCommentId}
              data={data}
              loadArticleComment={loadArticleComment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Comment;
