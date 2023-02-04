import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import './CommentList.scss';
import ReComment from './ReComment';

type Comment = {
  id: number;
  name: string;
  img: string;
  content: string;
  createdAt: string;
  likesNum: number;
  reComment: [
    {
      id: number;
      name: string;
      tier: string;
      content: string;
    }
  ];
};

export type ReCommentProps = {
  data: { id: number; name: string; tier: string; content: string };
};

const CommentList = () => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [copyCommentList, setCopyCommentList] = useState<Comment[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [reComOpen, setReComIsOpen] = useState<null | number>(null);

  const postId = useParams<string>();

  // 최신순, 인기순 탭 기능
  const selectSort = (idx: number) => {
    const likesList = [...commentList].sort((a, b) => b.likesNum - a.likesNum);
    setCurrentTab(idx);
    if (idx === 1) {
      setCommentList(likesList);
    } else {
      setCommentList(copyCommentList);
    }
  };

  // 댓글 조회
  const loadComment = () => {
    // axios.get(`/community/posts/${postId}/comments`)
    axios.get('/data/comment.json').then(res => {
      setCommentList(res.data);
      setCopyCommentList(res.data);
    });
  };

  // 댓글 삭제
  const deleteComment = (idx: number) => {
    alert('댓글을 삭제하시겠습니까?');
    axios.delete(`/community/comments/${idx}`).then(res => loadComment());
  };

  // 대댓글 토글
  const toggleReCom = (idx: number) => {
    setReComIsOpen(prev => (prev === idx ? null : idx));
  };

  useEffect(() => {
    loadComment();
  }, []);

  return (
    <>
      <nav className="filterWrap">
        {TABS.map((el, idx) => {
          return (
            <div
              className={idx === currentTab ? 'new focused' : 'new'}
              key={el.id}
              onClick={() => selectSort(idx)}
            >
              {el.tabName}
            </div>
          );
        })}
        {/* <div className="new" onClick={selectSort}>
          최신순
        </div>
        <div className="new" onClick={selectSort}>
          인기순
        </div> */}
      </nav>
      <div className="commentList">
        {commentList.map((comment, idx) => {
          const { id, name, img, content, createdAt, likesNum, reComment } =
            comment;

          return (
            <div key={id}>
              <div className="comment">
                <section className="userInfo">
                  <img className="profileImg" src={img} alt="profile img" />
                  <ul className="infoContent">
                    <li className="tier">Tier</li>
                    <li className="userName">{name}</li>
                    <li className="time">{createdAt}</li>
                    <li
                      className="deleteBtn"
                      onClick={() => deleteComment(idx)}
                    >
                      삭제
                    </li>
                  </ul>
                </section>
                <div className="content">{content}</div>
              </div>
              <section className="reComHeader">
                <FaThumbsUp />
                <FaRegThumbsUp />
                <span>{likesNum}</span>
                <div className="reComBtn" onClick={() => toggleReCom(idx)}>
                  <FaRegComment />
                  <span>댓글 달기</span>
                </div>
              </section>
              <div className={reComOpen === idx ? '' : 'hidden'}>
                <div className="writeReCom">
                  <FiCornerDownRight className="writeReComIcon" />
                  <form className="reComForm">
                    <textarea className="reCom" placeholder="댓글 남기기" />
                    <div className="enroll">
                      <button className="enrollBtn">등록</button>
                    </div>
                  </form>
                </div>
                {reComment.map(data => {
                  return <ReComment key={data.id} data={data} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CommentList;

const TABS = [
  {
    id: 1,
    tabName: '최신순',
  },
  {
    id: 2,
    tabName: '인기순',
  },
];
