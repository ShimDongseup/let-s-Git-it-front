import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiThumbsUp } from 'react-icons/fi';
import { FaRegComment } from 'react-icons/fa';
import { ArticleType } from '../ArticleList';
import ArticleMenu from '../../articleMenu/ArticleMenu';
import { useRecoilValue } from 'recoil';
import { articleSearchKeyword, articleSearchOption } from '../../../../atom';
import '../../articleList/articleList.scss';

function CommunitySearch() {
  const navigate = useNavigate();
  const sOption = useRecoilValue(articleSearchOption);
  const sKeyword = useRecoilValue(articleSearchKeyword);
  const [commuSearchList, setCommuSearchList] = useState<ArticleType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    searchParams.set('option', sOption);
    searchParams.set('keyword', sKeyword);
    setSearchParams(searchParams);
    //   // fetch(`IP/community/search?${sOption}&${sKeyword}`)
    fetch('../data/search.json')
      .then(res => res.json())
      .then(data => {
        setCommuSearchList(data);
      })
      .catch(err => console.log(err));
  }, []);

  const moveDetail = (i: number) => {
    navigate(`/article/${i}`);
  };

  return (
    <div className="community">
      <div className="articleInner">
        <ArticleMenu
          setArticleSearhList={function (
            value: React.SetStateAction<ArticleType[]>
          ): void {
            throw new Error('Function not implemented.');
          }}
        />
        <div className="articleList">
          <div className="articleListSort">
            <span className="selectTab">검색결과</span>
          </div>
          <div className="articleListInner">
            {commuSearchList.length !== 0 ? (
              commuSearchList.map((article, i) => {
                return (
                  <div className="articlePost" key={i}>
                    <div className="articlePostWrap">
                      <div className="articleListProfile">
                        <img src="../images/icon/bronze.png" alt="tier" />
                        <span className="userProfileName">
                          {article.userName}
                        </span>
                        <span className="userCategory">
                          {article.subCategoryName} |
                        </span>
                        <span className="userPostTime">
                          {article.createdAt}
                        </span>
                      </div>
                      <div className="articleListFlex">
                        <div className="articleListContent">
                          <p onClick={() => moveDetail(i)}>
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
              })
            ) : (
              <div className="noList">게시물이 없습니다.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunitySearch;
