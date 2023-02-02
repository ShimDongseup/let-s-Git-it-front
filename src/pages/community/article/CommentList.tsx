import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';
import { FiCornerDownRight } from 'react-icons/fi';
import './CommentList.scss';

export type Comment = {
  id: number;
  name: string;
  img: string;
  content: string;
  createdAt: string;
  likesNum: number;
  reComment: ReComment[];
};

export type ReComment = {
  id: number;
  name: string;
  tier: string;
  content: string;
};

const CommentList = () => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [newComList, setNewComList] = useState([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [isReComOpen, setIsReComOpen] = useState<boolean>(false);

  const postId = useParams<string>();

  const selectSort = (idx: number) => {
    setCurrentTab(idx);
    // if (idx === 1) {
    //   setCommentList([...commentList].sort((a, b) => b.likesNum - a.likesNum));
    // }
  };

  // 댓글 조회
  useEffect(() => {
    // axios.get(`/community/posts/${postId}/comments`)
    axios.get('/data/comment.json').then(res => setCommentList(res.data));
  }, []);

  const deleteComment = () => {};

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
      </nav>
      <div className="commentList">
        {commentList.map(comment => {
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
                    <li className="deleteBtn" onClick={deleteComment}>
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
                <div
                  className="reComBtn"
                  onClick={() => setIsReComOpen(prev => !prev)}
                >
                  <FaRegComment />
                  <span>댓글 달기</span>
                </div>
              </section>
              <div className={isReComOpen ? 'null' : 'hidden'}>
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
                  return (
                    <main className="reCommentSection" key={data.id}>
                      <FiCornerDownRight className="arrowIcon" />
                      <div className="reCommentWrap">
                        <div className="reComment">
                          <div className="tier">{data.tier}</div>
                          <div className="reComId">{data.name}</div>
                          <div className="reComDeleteBtn">삭제</div>
                        </div>
                        <div className="reComContent">{data.content}</div>
                      </div>
                    </main>
                  );
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
