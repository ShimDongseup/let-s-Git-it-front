import React, { useState } from 'react';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import ReComment from './ReComment';
import './Comment.scss';
import { CommentProps } from './CommentList';

const Comment = (props: any) => {
  const {
    comment: {
      id,
      name,
      img,
      content,
      createdAt,
      likesNum,
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
    let resultNum = isComLikes ? likesNum - 1 : likesNum + 1;

    axios
      .post(`community/likes/${idx}`, {
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
    <div key={id}>
      <div className="comment">
        <section className="userInfo">
          <img className="profileImg" src={img} alt="profile img" />
          <ul className="infoContent">
            <li className="tier">Tier</li>
            <li className="userName">{name}</li>
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
        <span>{likesNum}</span>
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
