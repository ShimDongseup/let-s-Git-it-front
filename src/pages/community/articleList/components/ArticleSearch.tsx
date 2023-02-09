import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { ArticleType } from '../ArticleList';
import ArticleMenu from '../../articleMenu/ArticleMenu';
import '../../articleList/articleList.scss';

interface ArticleProps {
  key: number;
  article: ArticleType;
}

function ArticleSearch({ article }: ArticleProps) {
  const navigate = useNavigate();
  const moveArticleDetail = () => {
    navigate(`/artcle/1`);
  };
  return (
    <div className="community">
      <div className="articleInner">
        <ArticleMenu
          setArticleList={function (
            value: React.SetStateAction<ArticleType[]>
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
        <div className="artilceList">
          <div className="artcileListSort">
            <span className="selectTab">검색결과</span>
          </div>
          <div className="articleInner">
            <div className="articlePost">
              <div className="articlePostWrap">
                <div className="articleListProfile">
                  <img src="../images/icon/bronze.png" alt="tier" />
                  <span className="userProfileName">{article.userName}</span>
                  <span className="userCategory">
                    {article.subCategoryName} |
                  </span>
                  <span className="userPostTime">{article.createdAt}</span>
                </div>
                <div className="articleListFlex">
                  <div className="articleListContent">
                    <p onClick={moveArticleDetail}>{article.post_title}</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleSearch;
