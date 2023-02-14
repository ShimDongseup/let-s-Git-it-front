import React from 'react';
import { FiCornerDownRight } from 'react-icons/fi';
import { ReCommentProps } from './CommentList';
import './ReComment.scss';

const ReComment = ({
  data: { reCommentId, tier, userName, content },
}: ReCommentProps) => {
  return (
    <main className="reCommentSection" key={reCommentId}>
      <FiCornerDownRight className="arrowIcon" />
      <div className="reCommentWrap">
        <div className="reComment">
          <div className="tier">{tier}</div>
          <div className="reComId">{userName}</div>
          <div className="reComDeleteBtn">삭제</div>
        </div>
        <div className="reComContent">{content}</div>
      </div>
    </main>
  );
};

export default ReComment;
