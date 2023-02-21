import React from 'react';
import axios from 'axios';
import { FiCornerDownRight } from 'react-icons/fi';
import { ReCommentProps } from '../../../../../@types/Article';
import { BASE_URL } from '../../../../config';
import './ReComment.scss';

function ReComment(props: ReCommentProps) {
  const {
    data: { commentId, tier, userName, content, isCreatedByUser },
    loadArticleComment,
  } = props;

  const token = `Bearer ${localStorage.getItem('token')}`;

  // 대댓글삭제
  const delReCom = () => {
    alert('댓글을 삭제하시겠습니까?');
    axios
      .delete(`${BASE_URL}/community/comments/${commentId}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  return (
    <main className="reCommentSection" key={commentId}>
      <div className="reCommentWrap">
        <div className="reCommentWriter">
          <FiCornerDownRight className="arrowIcon" />
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
        </div>
      </div>
      <div className="reComContent">{content}</div>
    </main>
  );
}

export default ReComment;
