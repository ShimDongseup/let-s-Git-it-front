import React from 'react';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { ArticleType } from '../ArticleList';
import { Link } from 'react-router-dom';
import './articlePost.scss';

interface ArticleProps {
  key: number;
  article: ArticleType;
}
function ArticlePost({ article }: ArticleProps) {
  return (
    <div className="articlePost">
      <div className="articlePostWrap">
        <div className="articleListProfile">
          <img src={article.tierId} alt="tier" />
          <span className="userProfileName">{article.userName}</span>
          <span className="userCategory">{article.category} |</span>
          <span className="userPostTime">{article.createdAt}</span>
        </div>
        <div className="articleListFlex">
          <div className="articleListContent">
            <Link to={`/article/${article.postId}`}>
              <p>{article.post_title}</p>
            </Link>
          </div>
          <div className="articleListReaction">
            <span>
              <FiThumbsUp className="reactionImg" />
              <span>{article.postLike}</span>
            </span>
            <span>
              <FaRegComment className="reactionImg" />
              <span>{article.comment}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePost;
