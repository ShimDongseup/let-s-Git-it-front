import React, { useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import ReComment from './ReComment';
import { CommentProps } from './CommentList';
import { BASE_URL, CBASE_URL } from '../../../config';
import './Comment.scss';

const Comment = (props: any) => {
  const {
    comment: {
      commentId,
      userName,
      profileImageUrl,
      content,
      tier,
      createdAt,
      likeNumber,
      groupOrder,
      reComment,
    },
    idx,
    postId,
    loadComment,
  }: CommentProps = props;

  const [isComLikes, setIsComLikes] = useState<boolean>(false);
  const [reComOpen, setReComOpen] = useState<boolean>(false);
  const token = localStorage.getItem('token');

  // 댓글 좋아요
  const clickIcon = () => {
    setIsComLikes(prev => !prev);
    let resultNum = isComLikes ? likeNumber - 1 : likeNumber + 1;

    axios
      .post(`${CBASE_URL}/community/comments/${idx}/likes`, {
        headers: { Authorization: token },
        data: { postId: postId, likesNum: resultNum },
      })
      .then(res => loadComment)
      .catch(err => console.log(err));
  };

  // 댓글 삭제
  const deleteComment = () => {
    alert('댓글을 삭제하시겠습니까?');
    axios
      .delete(`/community/comments/${idx}`, {
        headers: { Authorization: token },
      })
      .then(res => loadComment)
      .catch(err => console.log(err));
  };

  // 대댓글 토글
  const toggleReCom = () => {
    setReComOpen(prev => !prev);
  };

  // const [reCom, setReCom] = useState([]);
  // console.log([props]);
  // 대댓글 조회

  // setReCom([props].filter(x => x.groupOrder === 1));

  // console.log('recom', reCom);

  return (
    <div key={commentId}>
      <div className="comment">
        <section className="userInfo">
          <img className="profileImg" src={profileImageUrl} alt="profile img" />
          <ul className="infoContent">
            <li className="tier">{tier}</li>
            <li className="userName">{userName}</li>
            <li className="time">{createdAt}</li>
            <li className="deleteBtn" onClick={() => deleteComment()}>
              삭제
            </li>
          </ul>
        </section>
        <div className="content">{content}</div>
      </div>
      <section className="reComHeader">
        <div className="thumbsUpWrap">
          {isComLikes ? (
            <FaThumbsUp className="thumbsUp" onClick={() => clickIcon()} />
          ) : (
            <FaRegThumbsUp className="thumbsUp" onClick={() => clickIcon()} />
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
          <form className="reComForm">
            <textarea className="reCom" placeholder="댓글 남기기" />
            <div className="enroll">
              <button className="enrollBtn">등록</button>
            </div>
          </form>
        </div>
        {/* {reComment.map(data => {
          return <ReComment key={data.id} data={data} />;
        })} */}
      </div>
    </div>
  );
};

export default Comment;
