import React from 'react';
import { FaThumbsUp, FaRegThumbsUp, FaRegComment } from 'react-icons/fa';

type likeProps = {
  isLikedByUser: boolean;
  clickIcon(): void;
};

const CommentLikes = (props: likeProps) => {
  const { isLikedByUser, clickIcon } = props;
  console.log(isLikedByUser);
  return (
    <div>
      {!isLikedByUser ? (
        <FaThumbsUp className="thumbsUp" onClick={() => clickIcon()} />
      ) : (
        <FaRegThumbsUp className="thumbsUp" onClick={() => clickIcon()} />
      )}
    </div>
  );
};

export default CommentLikes;
