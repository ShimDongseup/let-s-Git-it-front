import React from 'react';
import { FiCornerDownRight } from 'react-icons/fi';
import { ReCommentProps } from './Article';
import axios from 'axios';
import { BASE_URL } from '../../../config';
import './ReComment.scss';

const ReComment = (props: ReCommentProps) => {
  const {
    data: { reCommentId, tier, userName, content, isCreatedByUser },
    loadArticleComment,
  } = props;
  const token = localStorage.getItem('token');

  // 대댓글삭제
  const delReCom = () => {
    alert('댓글을 삭제하시겠습니까?');
    axios
      .delete(`${BASE_URL}/community/comments/${reCommentId}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  return (
    <main className="reCommentSection" key={reCommentId}>
      <FiCornerDownRight className="arrowIcon" />
      <div className="reCommentWrap">
        <ul className="reComment">
          <li className="tier">{tier}</li>
          <li className="reComId">{userName}</li>
        </ul>
        <div
          className={isCreatedByUser ? 'reComDeleteBtn' : 'hidden'}
          onClick={delReCom}
        >
          삭제
        </div>
        <div className="reComContent">{content}</div>
      </div>
    </main>
  );
};

export default ReComment;
