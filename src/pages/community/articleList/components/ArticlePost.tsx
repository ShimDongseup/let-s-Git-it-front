import React from 'react';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { ArticleType } from '../ArticleList';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../../../atom';
import './articlePost.scss';

interface ArticleProps {
  key: number;
  article: ArticleType;
}
function ArticlePost({ article }: ArticleProps) {
  const navigate = useNavigate();
  const [clickActive, setClickActive] = useRecoilState(categoryState);
  const clickArticle = (name: string) => {
    if (clickActive === 9) {
      CATEGORY_LIST.forEach(el => {
        if (el.name === name) {
          setClickActive(el.id);
        }
      });
    }
  };

  return (
    <div className="articlePost">
      <div className="articlePostWrap">
        <div className="articleListProfile">
          <img src={`../image/icon/${article.tierName}.png`} alt="tier" />

          <span className="userProfileName">{article.userName}</span>
          <span className="userCategory">{article.subCategoryName} |</span>
          <span className="userPostTime">{article.createdAt}</span>
        </div>
        <div className="articleListFlex">
          <div className="articleListContent">
            <p
              onClick={() => {
                navigate(`/article/${article.postId}`);
                clickArticle(article.subCategoryName);
              }}
            >
              {article.post_title}
            </p>
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
const CATEGORY_LIST = [
  {
    id: 1,
    name: '공지사항',
    mainCategoryId: 1,
  },
  {
    id: 2,
    name: '개발뉴스',
    mainCategoryId: 1,
  },
  {
    id: 3,
    name: '버그신고',
    mainCategoryId: 1,
  },
  {
    id: 4,
    name: '자유',
    mainCategoryId: 2,
  },
  {
    id: 5,
    name: '유머',
    mainCategoryId: 2,
  },
  {
    id: 6,
    name: '질문',
    mainCategoryId: 2,
  },
  {
    id: 7,
    name: '프로젝트',
    mainCategoryId: 2,
  },
  {
    id: 8,
    name: '채용정보',
    mainCategoryId: 2,
  },
];
