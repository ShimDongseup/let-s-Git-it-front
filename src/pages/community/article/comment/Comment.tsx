import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import ReComment from '../reComment/ReComment';
import { CommentProps } from '../../../../../@types/Article';
import { BASE_URL } from '../../../../config';
import './Comment.scss';

function Comment(props: CommentProps) {
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
      groupOrder,
    },
    loadArticleComment,
  } = props;

  const [reComOpen, setReComOpen] = useState<boolean>(false);
  const token = `Bearer ${localStorage.getItem('token')}`;

  // 댓글 좋아요
  const clickIcon = async () => {
    await axios
      .post(`${BASE_URL}/community/comments/${commentId}/likes`, {
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
      .delete(`${BASE_URL}/community/comments/${commentId}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  // 대댓글 등록
  const [reComment, setReComment] = useState('');
  const handleReComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReComment(e.target.value);
  };
  const valid = reComment ? false : true;
  const params = useParams<string>();
  const postId = params.id;
  const addReComment = async () => {
    await axios
      .post(
        `${BASE_URL}/community/posts/${postId}/comment`,
        { content: reComment, groupOrder: groupOrder, depth: 2 },
        {
          headers: { Authorization: token },
        }
      )
      .then(res => {
        console.log(res);
        setReComment('');
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
            className={isCreatedByUser ? 'deleteBtn' : 'hidden'}
            onClick={() => deleteComment()}
          >
            삭제
          </div>
        </section>
        <div className="content">{content}</div>
      </div>
      <section className="reComHeader">
        <div className="thumbsUpWrap">
          {isLikedByUser ? (
            <FaThumbsUp onClick={() => clickIcon()} />
          ) : (
            <FaRegThumbsUp onClick={() => clickIcon()} />
          )}
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
          <div className="reComForm">
            <textarea
              className="reCom"
              placeholder="댓글 남기기"
              onChange={handleReComment}
              value={reComment}
            />
            <div className="enroll">
              <button
                className={valid ? 'enrollBtn' : 'enrollBtn active'}
                disabled={valid}
                onClick={addReComment}
              >
                등록
              </button>
            </div>
          </div>
        </div>
        {reComments.map(data => {
          return (
            <ReComment
              key={data.commentId}
              data={data}
              loadArticleComment={loadArticleComment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Comment;
