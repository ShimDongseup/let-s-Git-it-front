import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import { CommentListProps } from '../../../../@types/Article';
import './CommentList.scss';

function CommentList(props: CommentListProps) {
  const { commentList, setCommentList, copyCommentList, loadArticleComment } =
    props;

  const [currentTab, setCurrentTab] = useState<number>(0);

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
              />
            );
          })}
      </div>
    </>
  );
}

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
