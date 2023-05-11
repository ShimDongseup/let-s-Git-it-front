import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { accessToken } from '../atom';

type AddCommentProps = {
  commentGroup: number;
  depth: number;
  fetchComment: () => Promise<void>;
};

export default function useAddComment({
  commentGroup,
  depth,
  fetchComment,
}: AddCommentProps) {
  const [comment, setComment] = useState<string>('');
  const token = useRecoilValue(accessToken);

  const params = useParams<string>();
  const postId = params.id;

  const handleComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const addComment = async () => {
    if (comment.replace(/\s/g, '') === '') {
      alert('댓글을 입력하세요');
    } else {
      try {
        await axios.post(
          `/community/posts/${postId}/comment`,
          {
            content: comment,
            groupOrder: commentGroup,
            depth: depth,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComment('');
        fetchComment();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return { handleComment, addComment };
}
