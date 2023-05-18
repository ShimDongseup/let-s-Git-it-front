import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FiCornerDownRight } from 'react-icons/fi';
import { ReCommentProps } from '../../../../../@types/Article';
import { accessToken } from '../../../../atom';
import { useRecoilValue } from 'recoil';
import MomentWrapper from '../components/MomentWrapper';
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

  const token = useRecoilValue(accessToken);
  const params = useParams();
  const postId = params.id;
  const navi = useNavigate();

  // 대댓글삭제
  const delReCom = async () => {
    const text = '댓글을 삭제하시겠습니까?';
    if (window.confirm(text)) {
      try {
        await axios.post(
          `api/community/comments/${commentId}`,
          { postId: Number(postId), groupOrder: groupOrder, depth: 2 },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchComment();
      } catch (err) {
        console.log(err);
      }
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
            <MomentWrapper createdAt={createdAt} />
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
