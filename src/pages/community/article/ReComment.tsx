import React from 'react';
import { FiCornerDownRight } from 'react-icons/fi';
import { ReCommentProps } from './CommentList';
import axios from 'axios';
import { BASE_URL, CBASE_URL } from '../../../config';
import './ReComment.scss';

const ReComment = (props: ReCommentProps) => {
  const {
    data: { reCommentId, tier, userName, content },
    loadArticleComment,
  } = props;

  // 대댓글삭제
  const delReCom = () => {
    alert('댓글을 삭제하시겠습니까?');
    axios
      .delete(`${CBASE_URL}/community/comments/${reCommentId}`, {
        headers: { Authorization: token },
      })
      .then(res => {
        console.log(res);
        loadArticleComment();
      })
      .catch(err => console.log(err));
  };

  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJzZWNyZXRPclByaXZhdGVLZXkiOiJnaXRfcmFuayIsImlhdCI6MTY3NjM2NDEyOSwiZXhwIjoxNjc2MzY1OTI5fQ.gDSClaASdaWssmretGzZAcf50a1EoTzJK_c7kb9uKxI`;

  return (
    <main className="reCommentSection" key={reCommentId}>
      <FiCornerDownRight className="arrowIcon" />
      <div className="reCommentWrap">
        <div className="reComment">
          <div className="tier">{tier}</div>
          <div className="reComId">{userName}</div>
          <div className="reComDeleteBtn" onClick={delReCom}>
            삭제
          </div>
        </div>
        <div className="reComContent">{content}</div>
      </div>
    </main>
  );
};

export default ReComment;
