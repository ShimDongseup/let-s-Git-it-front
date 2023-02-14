import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from './Comment';
import { CBASE_URL } from '../../../config';
import './CommentList.scss';

type CommentType = {
  commentId: number;
  content: string;
  userName: string;
  profileImageUrl: string;
  tier: string;
  groupOrder: number;
  createdAt: string;
  likeNumber: number;
  isCreatedByUser: boolean;
  reComment: RecommentType[];
};

type RecommentType = {
  id: number;
  name: string;
  tier: string;
  content: string;
};

export type CommentProps = {
  comment: CommentType;
  idx: number;
  postId: string | undefined;
  loadComment(): void;
};

export type ReCommentProps = {
  data: { id: number; name: string; tier: string; content: string };
};

const CommentList = () => {
  const [commentList, setCommentList] = useState<CommentType[]>([]);
  const [copyCommentList, setCopyCommentList] = useState<CommentType[]>([]);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const params = useParams<string>();
  const postId = params.id;
  const token = localStorage.getItem('token');

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

  // 댓글 조회
  const loadComment = async () => {
    // axios.get(`${CBASE_URL}/community/posts/${postId}/comments`)
    // axios.get('/data/comment.json')
    await axios
      .get(`${CBASE_URL}/community/posts/${postId}/comments`)
      .then(res => {
        setCommentList(res.data[0].data);
        setCopyCommentList(res.data[0].data);
        setReCom(res.data[0].data);
      });
  };

  useEffect(() => {
    loadComment();
    sortCom();
  }, []);

  const [reCom, setReCom] = useState<CommentType[]>([]);
  // console.log('recom', reCom);
  // console.log(reCom.filter(x => x.groupOrder === 1));
  // console.log(reCom.filter(x => x.groupOrder === 1)[0]);
  // console.log(reCom.filter(x => x.groupOrder === 2)[0]);

  const com = [];

  const sortCom = () => {
    com.push(reCom.filter(x => x.groupOrder === 1)[0]);
    com.push(reCom.filter(x => x.groupOrder === 2)[0]);
  };

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
