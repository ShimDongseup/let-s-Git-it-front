import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import { FiCornerDownRight } from 'react-icons/fi';
import { BASE_URL, HEADERS } from '../../../../config';
import { ReCommentProps } from '../../../../../@types/Article';
import './ReComment.scss';

function ReComment(props: ReCommentProps) {
  const {
    data: {
      commentId,
      tier,
      userName,
      content,
      createdAt,
      groupOrder,
      isCreatedByUser,
    },
    loadArticleComment,
  } = props;

  const params = useParams();
  const postId = params.id;
  const navi = useNavigate();

  // 대댓글삭제
  const delReCom = () => {
    const text = '댓글을 삭제하시겠습니까?';
    if (window.confirm(text)) {
      axios
        .post(
          `${BASE_URL}/community/comments/${commentId}`,
          { postId: Number(postId), groupOrder: groupOrder, depth: 2 },
          HEADERS
        )
        .then(res => {
          loadArticleComment();
        })
        .catch(err => console.log(err));
    }
  };

  const goToUserPropfile = () => {
    navi(`/userdetail/${userName}`);
  };

  return (
    <main className="reCommentSection" key={commentId}>
      <div className="reCommentWrap">
        <div className="reCommentWriter">
          <FiCornerDownRight className="arrowIcon" />
          <ul className="reComment" onClick={goToUserPropfile}>
            <img src={`../image/${tier}.png`} className="tier" alt="tier" />
            <li className="reComId">{userName}</li>
            <Moment fromNow className="time">
              {createdAt}
            </Moment>
          </ul>
          <div
            className={isCreatedByUser ? 'reComDeleteBtn' : 'hidden'}
            onClick={delReCom}
          >
            삭제
          </div>
        </div>
        <pre className="reComContent">{content}</pre>
      </div>
    </main>
  );
}

export default ReComment;
