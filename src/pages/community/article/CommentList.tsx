import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CommentList.scss';
import Comment from './Comment';

type Comment = {
  id: number;
  name: string;
  img: string;
  content: string;
  createdAt: string;
  likesNum: number;
  reComment: Recomment[];
};

type Recomment = {
  id: number;
  name: string;
  tier: string;
  content: string;
};

export type CommentProps = {
  comment: Comment;
  idx: number;
  postId: number;
  loadComment: void;
};

export type ReCommentProps = {
  data: { id: number; name: string; tier: string; content: string };
};

const CommentList = () => {
  const [commentList, setCommentList] = useState<Comment[]>([]);
  const [copyCommentList, setCopyCommentList] = useState<Comment[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const postId = useParams<string>();
  const token = localStorage.getItem('token');
  console.log('commentList', commentList);

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
  const loadComment = async () => {
    // axios.get(`/community/posts/${postId}/comments`)
    await axios.get('/data/comment.json').then(res => {
      setCommentList(res.data);
      setCopyCommentList(res.data);
    });
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
      </nav>
      <div className="commentList">
        {commentList.map((comment, idx) => {
          return (
            <Comment
              key={idx}
              idx={idx}
              postId={postId}
              comment={comment}
              loadComment={loadComment}
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
