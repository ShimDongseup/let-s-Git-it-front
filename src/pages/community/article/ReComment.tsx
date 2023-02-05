import React from 'react';
import { FiCornerDownRight } from 'react-icons/fi';
import { ReCommentProps } from './CommentList';
import './ReComment.scss';

const ReComment = ({ data: { id, tier, name, content } }: ReCommentProps) => {
  return (
    <main className="reCommentSection" key={id}>
      <FiCornerDownRight className="arrowIcon" />
      <div className="reCommentWrap">
        <div className="reComment">
          <div className="tier">{tier}</div>
          <div className="reComId">{name}</div>
          <div className="reComDeleteBtn">삭제</div>
        </div>
        <div className="reComContent">{content}</div>
      </div>
    </main>
  );
};

export default ReComment;
