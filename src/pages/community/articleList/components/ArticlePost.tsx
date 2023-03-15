import React from 'react';
import Moment from 'react-moment';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { categoryState } from '../../../../atom';
import { ArticleProps } from '../../../../../@types/ArticleList';
import './articlePost.scss';

function ArticlePost({ article }: ArticleProps) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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

  const searchOption = String(searchParams.get('option'));
  const searchKeyword = String(searchParams.get('keyword'));

  const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^$`~'":<>{}()|[\]\\]/g, '\\$&');
  };
  const getHighlightedText = (text: string, highlight: string) => {
    const escapedHighlight = escapeRegExp(highlight);
    const parts = text.split(new RegExp(`(${escapedHighlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { backgroundColor: 'yellow' }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="articlePost">
      <div className="articlePostWrap">
        <div className="articleListProfile">
          <img src={`../image/${article.tierName}.png`} alt="tier" />
          <span className="userProfileName">
            {clickActive === 9 ? (
              <span>
                {searchOption === 'author'
                  ? getHighlightedText(article.userName, searchKeyword)
                  : searchOption === 'title_author'
                  ? getHighlightedText(article.userName, searchKeyword)
                  : article.userName}
              </span>
            ) : (
              article.userName
            )}
          </span>
          <span className="userCategory">{article.subCategoryName} |</span>
          <span className="userPostTime">
            <Moment fromNow>{article.createdAt}</Moment>
          </span>
        </div>
        <div className="articleListFlex">
          <div className="articleListContent">
            {clickActive === 9 ? (
              <p
                onClick={() => {
                  navigate(`/article/${article.postId}`);
                  clickArticle(article.subCategoryName);
                }}
              >
                {searchOption === 'title'
                  ? getHighlightedText(article.post_title, searchKeyword)
                  : searchOption === 'title_author'
                  ? getHighlightedText(article.post_title, searchKeyword)
                  : article.post_title}
              </p>
            ) : (
              <p
                onClick={() => {
                  navigate(`/article/${article.postId}`);
                  clickArticle(article.subCategoryName);
                }}
              >
                {article.post_title}
              </p>
            )}
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
    name: '개발',
    mainCategoryId: 2,
  },
  {
    id: 6,
    name: '프로젝트',
    mainCategoryId: 2,
  },
  {
    id: 7,
    name: '채용정보',
    mainCategoryId: 2,
  },
];
