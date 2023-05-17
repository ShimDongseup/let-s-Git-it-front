import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import ReComment from '../reComment/ReComment';
import { CommentProps } from '../../../../../@types/Article';
import { useRecoilValue } from 'recoil';
import { accessToken } from '../../../../atom';
import MomentWrapper from '../components/MomentWrapper';
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
    fetchComment,
  } = props;

  const [isReComOpen, setIsReComOpen] = useState<boolean>(true);
  const [reComment, setReComment] = useState<string>('');
  const token = useRecoilValue(accessToken);

  const navi = useNavigate();
  const params = useParams<string>();
  const postId = params.id;
  const valid = reComment ? false : true;

  // 댓글 좋아요
  const likeComment = async () => {
    try {
      await axios.post(
        `${BASE_URL}/community/comments/${commentId}/likes`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComment();
    } catch (err) {
      console.log(err);
    }
  };

  // 댓글 삭제
  const deleteComment = async () => {
    const text = '대댓글도 함께 삭제됩니다.\n댓글을 삭제하시겠습니까?';
    if (window.confirm(text)) {
      try {
        await axios.post(
          `${BASE_URL}/community/comments/${commentId}`,
          { postId: Number(postId), groupOrder: groupOrder, depth: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchComment();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 대댓글 등록
  const handleReComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReComment(e.target.value);
  };

  const addReComment = async () => {
    if (reComment.replace(/\s/g, '') === '') {
      alert('댓글을 입력하세요');
    } else {
      try {
        await axios.post(
          `${BASE_URL}/community/posts/${postId}/comment`,
          { content: reComment, groupOrder: groupOrder, depth: 2 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReComment('');
        fetchComment();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // 대댓글 토글
  const toggleReCom = () => {
    setIsReComOpen(prev => !prev);
  };

  // 유저 프로필로 이동
  const goToUserPropfile = () => {
    navi(`/userdetail/${userName}`);
  };

  return (
    <div key={commentId}>
      <article className="commentPage">
        <section className="userInfo">
          <img
            className="profileImg"
            src={profileImageUrl}
            onClick={goToUserPropfile}
            alt="profile img"
          />
          <ul className="infoContent" onClick={goToUserPropfile}>
            <img src={`../image/${tier}.png`} className="tier" alt="tier" />
            <li className="userName">{userName}</li>
            <MomentWrapper createdAt={createdAt} />
          </ul>
          <div
            className={isCreatedByUser ? 'deleteBtn' : 'hidden'}
            onClick={() => deleteComment()}
          >
            삭제
          </div>
        </section>
        <pre className="content">{content}</pre>
      </article>
      <section className="reComHeader">
        <div className="thumbsUpWrap">
          {isLikedByUser ? (
            <FaThumbsUp onClick={() => likeComment()} />
          ) : (
            <FaRegThumbsUp onClick={() => likeComment()} />
          )}
        </div>
        <span>{likeNumber}</span>
        <div className="reComBtn" onClick={() => toggleReCom()}>
          <FaRegComment />
          <span>{reComments.length}</span>
          <span>{isReComOpen ? '댓글 닫기' : '댓글 보기'}</span>
        </div>
      </section>
      <article className={isReComOpen ? '' : 'hidden'}>
        {reComments.map(data => {
          return (
            <ReComment
              key={data.commentId}
              data={data}
              fetchComment={fetchComment}
            />
          );
        })}
        <section className={token ? 'writeReCom' : 'hidden'}>
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
        </section>
      </article>
    </div>
  );
}

export default Comment;
