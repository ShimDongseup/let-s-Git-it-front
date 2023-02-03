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
          <img src="../images/icon/bronze.png" alt="tier" />
          <span className="userProfileName">{article.userName}</span>
          <span className="userCategory">{article.category} |</span>
          <span className="userPostTime">{article.postTime}</span>
        </div>
        <div className="articleListFlex">
          <div className="articleListContent">
            <Link to={`/article/${article.id}`}>
              <p>{article.title}</p>
            </Link>
          </div>
          <div className="articleListReaction">
            <span>
              <FiThumbsUp className="reactionImg" />
              <span>{article.recommendNum}</span>
            </span>
            <span>
              <FaRegComment className="reactionImg" />
              <span>{article.commentNum}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePost;
