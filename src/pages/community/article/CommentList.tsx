import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import { CBASE_URL } from '../../../config';
import './CommentList.scss';
import { CommentListProps } from './Article';

const CommentList = (props: CommentListProps) => {
  const { commentList, setCommentList, copyCommentList, loadArticleComment } =
    props;
  const [currentTab, setCurrentTab] = useState<number>(0);
  const params = useParams<string>();
  const postId = params.id;
  // const token = localStorage.getItem('token');
  const token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMwLCJzZWNyZXRPclByaXZhdGVLZXkiOiJnaXRfcmFuayIsImlhdCI6MTY3NjM2NDEyOSwiZXhwIjoxNjc2MzY1OTI5fQ.gDSClaASdaWssmretGzZAcf50a1EoTzJK_c7kb9uKxI`;

  // 최신순, 인기순 탭 기능
  const selectSort = (idx: number) => {
    const likesList = [...commentList].sort(
      (a, b) => b.likeNumber - a.likeNumber
    );
    setCurrentTab(idx);
    if (idx === 1) {
      setCommentList(likesList);
    } else {
      setCommentList(copyCommentList);
    }
  };

  useEffect(() => {
    loadArticleComment();
  }, []);

  const isLike = commentList.map(x => x.isLikedByUser);
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
        {commentList &&
          commentList.map((comment, idx) => {
            return (
              <Comment
                key={idx}
                comment={comment}
                loadArticleComment={loadArticleComment}
                isLike={comment.isLikedByUser}
              />
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
