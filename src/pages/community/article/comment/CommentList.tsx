import React, { useEffect } from 'react';
import Comment from './Comment';
import { CommentListProps } from '../../../../../@types/Article';
import { useRecoilState } from 'recoil';
import { commentOption } from '../../../../atom';
import './CommentList.scss';

function CommentList(props: CommentListProps) {
  const { commentList, loadArticleComment } = props;

  const [currentTab, setCurrentTab] = useRecoilState(commentOption);

  useEffect(() => {
    loadArticleComment();
  }, []);

  return (
    <>
      <section className="filterWrap">
        {TABS.map((el, idx) => {
          return (
            <nav
              className={idx === currentTab ? 'tab focused' : 'tab'}
              key={el.id}
              onClick={() => setCurrentTab(idx)}
            >
              {el.tabName}
            </nav>
          );
        })}
      </section>
      <article className="commentList">
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
      </article>
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
