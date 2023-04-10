import React, { useEffect } from 'react';
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
    fetchComment,
  } = props;

  const params = useParams();
  const postId = params.id;
  const navi = useNavigate();

  useEffect(() => {
    console.log('recomment 리렌더링!');
  }, []);

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
          fetchComment();
        })
        .catch(err => console.log(err));
    }
  };

  const goToUserPropfile = () => {
    navi(`/userdetail/${userName}`);
  };

  return (
    <section className="reCommentSection" key={commentId}>
      <article className="reCommentWrap">
        <section className="reCommentWriter">
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
        </section>
        <pre className="reComContent">{content}</pre>
      </article>
    </section>
  );
}

export default ReComment;
